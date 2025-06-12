import axios from "axios";
import { Children, createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { io } from "socket.io-client";


const baseUrl = "http://localhost:4000/api/";
const api = axios.create({
    baseURL: baseUrl,
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("chat_token");
        if (token) {
            config.headers["authorization"] = token;  
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('chat_token'));
    const [authUser, setAuthUser] = useState(null);
    const [onlineuser, setOnlineUser] = useState([]);
    const [socket, setSocket] = useState(null);

    const checkAuth = async () => {
        try {
            const { data } = await api.get("user/check");
            if (data.success) {
                setAuthUser(data?.data?.user);
                connectSocket(data?.data?.user);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const login = async (state, credentials) => {
        try {
            const { data } = await api.post(`user/${state}`, credentials);
            console.log(data);
            
            if (data?.success) {
                setAuthUser(data?.data?.user);
                connectSocket(data?.data?.user);
                setToken(data?.data?.token);
                localStorage.setItem("chat_token", data?.data?.token);
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        }
    };

    const logout = () => {
        localStorage.removeItem("chat_token");
        setToken(null);
        setAuthUser(null);
        setOnlineUser([]);
        toast.success("Logged out successfully");
        socket?.disconnect();
    };

    const updateProfile = async (body) => {
        try {
            const { data } = await api.post("user/update-profile", body);
            if (data?.success) {
                setAuthUser(data?.data?.user);
                toast.success(data?.message);
            } else {
                toast.error(data?.message);
            }
        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        }
    };

    const connectSocket = (userData) => {
        if (!userData || socket?.connected) return;
        const newSocket = io(api, {
            query: {
                userId: userData._id,
            },
        });
        newSocket.connect();
        setSocket(newSocket);
        newSocket.on("getOnlineUsers", (userIds) => {
            setOnlineUser(userIds);
        });
    };

    useEffect(() => {
        if (token) {
            checkAuth();
        }
    }, [token]);

    const value = {
        authUser,
        onlineuser,
        socket,
        login,
        logout,
        updateProfile
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};