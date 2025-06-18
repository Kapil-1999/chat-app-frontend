import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "./AuthContext";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [unseenMessages, setUnseenMessages] = useState({});
  const { socket, api } = useContext(AuthContext);

  const getUsers = async () => {
    try {
      const { data } = await api.get("messages/users");
      if (data.success) {
        setUsers(data?.data?.user);
        setUnseenMessages(data?.data?.unseenMessages || {});
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Failed to get users:", error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const getMessages = async (userId) => {
    try {
      const { data } = await api.get(`messages/message/${userId}`);
      if (data.success) {
        setMessages(data?.data || []);
      }
    } catch (error) {
      console.error("Failed to get messages:", error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const sendMessage = async (messageData) => {
    try {
      const { data } = await api.post(`messages/send/${selectedUser._id}`, messageData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (data.success) {
        setMessages(prev => [...prev, data.data]);
        return true;
      }
      toast.error(data.message);
    } catch (error) {
      console.error("Failed to send message:", error);
      toast.error(error.response?.data?.message || error.message);
    }
    return false;
  };

  const markAsSeen = async (messageId) => {
    try {
      await api.put(`messages/mark/${messageId}`);
    } catch (error) {
      console.error("Failed to mark as seen:", error);
    }
  };

  // Socket message handling
  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage) => {      
      if (selectedUser && newMessage.senderId === selectedUser._id) {
        newMessage.seen = true;
        setMessages(prev => [...prev, newMessage]);
        markAsSeen(newMessage._id);
      } else {
        setUnseenMessages(prev => ({
          ...prev,
          [newMessage.senderId]: (prev[newMessage.senderId] || 0) + 1
        }));
      }
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, selectedUser]);

  return (
    <ChatContext.Provider value={{
      messages,
      users,
      selectedUser,
      unseenMessages,
      getUsers,
      getMessages,
      sendMessage,
      setSelectedUser,
      setUnseenMessages
    }}>
      {children}
    </ChatContext.Provider>
  );
};