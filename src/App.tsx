import { useContext, useState, useEffect } from "react";
import styles from "./App.module.scss";
import { LoginBox } from "./components/LoginBox";

import { MessageList } from "./components/MessageList";
import { SendMessageForm } from "./components/SendMessageForm";
import { AuthContext } from "./contexts/auth";

export function App() {
  const { user } = useContext(AuthContext);
  const [isDesktop, setDesktop] = useState<boolean>(window.innerWidth > 920);

  const updateMedia = () => {
    setDesktop(window.innerWidth > 920);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  return (
    <main
      className={`${styles.contentWrapper} ${
        !!user ? styles.contentSigned : ""
      }`}
    >
      {isDesktop && <MessageList isDesktop={isDesktop} />}
      {!!user ? <SendMessageForm isDesktop={isDesktop} /> : <LoginBox />}
    </main>
  );
}
