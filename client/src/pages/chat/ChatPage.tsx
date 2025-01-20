"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Topbar from "@/components/Topbar";
import { useChatStore } from "@/stores/useChatStore";
import { useUser } from "@clerk/clerk-react";
import UsersList from "./components/UsersList";
import ChatHeader from "./components/ChatHeader";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import MessageInput from "./components/MessageInput";
import { Disc3 } from "lucide-react";

// Define types for message and user
interface Message {
  _id: string;
  content: string;
  createdAt: string;
  senderId: string;
}


// Format time function
const formatTime = (date: string): string => {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

// Main ChatPage component
const ChatPage = () => {
  const { user } = useUser();
  const { messages, selectedUser, fetchUsers, fetchMessages } = useChatStore();

  // Fetch users when user is available
  useEffect(() => {
    if (user) fetchUsers();
  }, [fetchUsers, user]);

  // Fetch messages when a user is selected
  useEffect(() => {
    if (selectedUser) fetchMessages(selectedUser.clerkId);
  }, [selectedUser, fetchMessages]);

  return (
    <main className="h-full rounded-lg overflow-hidden relative">
      <LiveWallpaper />
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-10">
        <Topbar />
        <div className="grid lg:grid-cols-[300px_1fr] grid-cols-[80px_1fr] h-[calc(100vh-180px)]">
          <UsersList />
          <div className="flex flex-col h-full bg-zinc-900/70 rounded-lg overflow-hidden">
            {selectedUser ? (
              <>
                <ChatHeader />
                <ScrollArea className="h-[calc(100vh-340px)] px-4">
                  <AnimatePresence initial={false}>
                    {messages.map((message: Message) => (
                      <MessageBubble
                        key={message._id}
                        message={message}
                        isCurrentUser={message.senderId === user?.id}
                        userImage={
                          message.senderId === user?.id
                            ? user.imageUrl
                            : selectedUser.imageUrl
                        }
                      />
                    ))}
                  </AnimatePresence>
                </ScrollArea>
                <MessageInput />
              </>
            ) : (
              <NoConversationPlaceholder />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

// MessageBubble component
interface MessageBubbleProps {
  message: Message;
  isCurrentUser: boolean;
  userImage: string | undefined; // Allow undefined for cases where image might not be available
}

const MessageBubble = ({
  message,
  isCurrentUser,
  userImage,
}: MessageBubbleProps) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -50 }}
    className={`flex items-start gap-3 mb-4 ${
      isCurrentUser ? "flex-row-reverse" : ""
    }`}
  >
    <Avatar className="size-8">
      <AvatarImage src={userImage} alt="User avatar" />
    </Avatar>
    <div
      className={`rounded-lg p-3 max-w-[70%] ${
        isCurrentUser
          ? "bg-gradient-to-r from-[#B5179E] to-[#7209B7] text-white"
          : "bg-zinc-800 text-white"
      }`}
    >
      <p className="text-sm">{message.content}</p>
      <span className="text-xs text-zinc-300 mt-1 block">
        {formatTime(message.createdAt)}
      </span>
    </div>
  </motion.div>
);

// NoConversationPlaceholder component
const NoConversationPlaceholder = () => (
  <div className="flex flex-col items-center justify-center h-full space-y-6">
    <motion.div
      animate={{
        scale: [1, 1.2, 1],
        rotate: [0, 360],
        transition: {
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        },
      }}
    >
      <Disc3 className="size-16 text-[#B5179E]" />
    </motion.div>
    <div className="text-center">
      <h3 className="text-white text-lg font-medium mb-1">
        No conversation selected
      </h3>
      <p className="text-zinc-400 text-sm">Choose a friend to start chatting</p>
    </div>
  </div>
);

// LiveWallpaper component for animated background particles
const LiveWallpaper = () => {
  const [particles, setParticles] = useState<
    { x: number; y: number; size: number; speedX: number; speedY: number }[]
  >([]);

  useEffect(() => {
    const createParticle = () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 5 + 1,
      speedX: Math.random() * 3 - 1.5,
      speedY: Math.random() * 3 - 1.5,
    });

    setParticles(Array.from({ length: 50 }, createParticle));

    const animateParticles = () => {
      setParticles((prevParticles) =>
        prevParticles.map((p) => ({
          ...p,
          x: (p.x + p.speedX + window.innerWidth) % window.innerWidth,
          y: (p.y + p.speedY + window.innerHeight) % window.innerHeight,
        }))
      );
    };

    const intervalId = setInterval(animateParticles, 50);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="absolute inset-0 bg-gradient-to-br from-[#B5179E]/20 to-[#7209B7]/20">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: Math.random() * 2 + 1,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default ChatPage;
