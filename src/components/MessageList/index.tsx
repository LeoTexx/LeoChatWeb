import { useEffect, useState } from "react";
import io from "socket.io-client";
import { api } from "../../services/api";
import LogoLeo from "../LogoLeo";
import styles from "./styles.module.scss";

type Message = {
  id: string;
  text: string;
  user: {
    name: string;
    avatar_url: string;
  };
};

type MessageProps = {
  isDesktop: boolean;
};

const messagesQueue: Message[] = [];

const { VITE_WEBSOCKET_URL } = import.meta.env;

const socket = io(VITE_WEBSOCKET_URL);

socket.on("new_message", (newMessage: Message) => {
  messagesQueue.push(newMessage);
});

export function MessageList({ isDesktop }: MessageProps) {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    setInterval(() => {
      if (messagesQueue.length > 0) {
        setMessages((prevState) =>
          [
            messagesQueue[0],
            prevState[0],
            prevState[1],
            prevState[2],
            prevState[3],
            prevState[4],
            prevState[5],
            prevState[6],
            prevState[7],
            prevState[8],
          ].filter(Boolean)
        );

        messagesQueue.shift();
      }
    }, 1000);
  }, []);

  useEffect(() => {
    api.get<Message[]>("messages/last10").then((response) => {
      setMessages(response.data);
    });
  }, []);

  return (
    <div className={styles.messageListWrapper}>
      {isDesktop && <LogoLeo />}
      <ul className={styles.messageList}>
        {messages.map((message) => {
          return (
            <div className={styles.messageContainer}>
              <li key={message.id} className={styles.message}>
                <p className={styles.messageContent}>{message.text}</p>
                <div className={styles.messageUser}>
                  <div className={styles.userImage}>
                    <img
                      src={message.user.avatar_url}
                      alt={message.user.name}
                    />
                  </div>
                  <span>{message.user.name}</span>
                </div>
              </li>
            </div>
          );
        })}
      </ul>
    </div>
  );
}
