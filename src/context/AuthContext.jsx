import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

const baseUrl = "http://localhost:4000/api/";
const api = axios.create({ baseURL: baseUrl });

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("chat_token");
    if (token) config.headers["authorization"] = token;
    return config;
  },
  (error) => Promise.reject(error)
);

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('chat_token'));
  const [authUser, setAuthUser] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [socket, setSocket] = useState(null);
  const navigate = useNavigate()
  const checkAuth = async () => {
    try {
      const { data } = await api.get("user/check");
      if (data.success) {
        setAuthUser(data?.data?.user);
        connectSocket(data?.data?.user);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      logout();
    }
  };

  const connectSocket = (userData) => {
    // Clean up existing socket
    if (socket) {
      socket.disconnect();
      socket.off();
    }

    if (!userData) return;

    const newSocket = io("http://localhost:4000", {
      path: "/socket.io",
      query: { userId: userData._id },
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 20000
    });

    // Socket event handlers
    newSocket.on("connect", () => {
      console.log("Socket connected");
    });

    newSocket.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
      if (reason === "io server disconnect") {
        newSocket.connect();
      }
    });

    newSocket.on("connect_error", (error) => {
      console.error("Connection error:", error);
    });

    newSocket.on("getOnlineUsers", (userIds) => {
      setOnlineUsers(userIds);
    });

    setSocket(newSocket);
  };

  const login = async (state, credentials) => {
    try {
      const { data } = await api.post(`user/${state}`, credentials);
      if (data?.success) {
        setAuthUser(data?.data?.user);
        setToken(data?.data?.token);
        localStorage.setItem("chat_token", data?.data?.token);
        connectSocket(data?.data?.user);
        toast.success(data.message);
        return true;
      }
      toast.error(data.message);
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || error.message);
    }
    return false;
  };

  const logout = () => {
    if (socket) {
      socket.disconnect();
      socket.off();
    }
    localStorage.removeItem("chat_token");
    setToken(null);
    setAuthUser(null);
    setOnlineUsers([]);
    setSocket(null);
    navigate("/")
    toast.success("Logged out successfully");
  };

  const updateProfile = async (body) => {
    try {
      const { data } = await api.post("user/update-profile", body);
      if (data?.success) {
        setAuthUser(data?.data?.user);
        toast.success(data?.message);
        return true;
      }
      toast.error(data?.message);
    } catch (error) {
      console.error("Update error:", error);
      toast.error(error.message);
    }
    return false;
  };

  // Socket health check
  useEffect(() => {
    const interval = setInterval(() => {
      if (socket && !socket.connected) {
        console.log("Attempting to reconnect socket...");
        socket.connect();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [socket]);

  // Initial auth check
  useEffect(() => {
    if (token) checkAuth();
  }, [token]);

  return (
    <AuthContext.Provider value={{
      authUser,
      onlineUsers,
      socket,
      api,
      login,
      logout,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};