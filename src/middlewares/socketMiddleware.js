import { io } from "socket.io-client";

const BASE_URL = "http://localhost:1010";

export const connectSocket = async (
  user,
  socket,
  setSocket,
  setOnlineUsers,
  dispatch
) => {
  if (!user || socket?.connected) return;
  socket = io(BASE_URL, {
    query: {
      userId: user._id,
    },
  });
  socket.connect();
  dispatch(setSocket(socket));
  socket.on("getOnlineUsers", (userIds) => {
    dispatch(setOnlineUsers({ userIds }));
  });
};

export const disconnectSocket = async (socket) => {
  if (socket?.connected) socket.disconnect();
};

export const subscribeToMessages = async (
  socket,
  selectedUser,
  setSocket,
  dispatch
) => {
  if (!selectedUser) return;
  socket.on("newMessage", (newMessage) => {
    const isMessageSentFromSelectedUser =
      newMessage.senderId === selectedUser._id;
    if (!isMessageSentFromSelectedUser) return;
    dispatch(setSocket(socket));
  });
};

export const unsubscribeFromMessages = async (socket) => {
  await socket.off("newMessage");
};
