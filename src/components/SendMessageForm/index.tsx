import { useContext, useState, FormEvent } from "react";
import { VscGithubInverted, VscSignOut } from "react-icons/vsc";
import { AuthContext } from "../../contexts/auth";
import { api } from "../../services/api";
import { MessageList } from "../MessageList";
import styles from "./styles.module.scss";

type BoxProps = {
  isDesktop: boolean;
};

export function SendMessageForm({ isDesktop }: BoxProps) {
  const { user, signOut } = useContext(AuthContext);
  const [message, setMessage] = useState("");

  async function handleSendMessage(event: FormEvent) {
    event.preventDefault();

    if (!message.trim()) {
      return;
    }

    await api.post("messages", { message });

    setMessage("");
  }

  return (
    <div
      className={styles.sendMessageFormWrapper}
      style={{ width: !isDesktop ? "100vw" : "" }}
    >
      <button onClick={signOut} className={styles.signOutButton}>
        <VscSignOut size="32" />
      </button>

      <header className={styles.userInformation}>
        <div className={styles.userImage}>
          <img src={user?.avatar_url} alt={user?.name} />
        </div>
        <strong className={styles.userName}>{user?.name}</strong>
        <span className={styles.userGithub}>
          <VscGithubInverted size="16" />
          {user?.login}
        </span>
      </header>
      {!isDesktop && <MessageList isDesktop={isDesktop} />}
      <form onSubmit={handleSendMessage} className={styles.sendMessageForm}>
        <label htmlFor="message">Mensagem</label>

        <textarea
          name="message"
          id="message"
          placeholder="Qual a sua dúvida??"
          onChange={(event) => setMessage(event.target.value)}
          value={message}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <a
            className="download"
            href="https://exp-shell-app-assets.s3.us-west-1.amazonaws.com/android/%40leo.texx/chatdoleo-32bbf8dbcf774071a26754d00f7afc8c-signed.apk"
          >
            <div>Download</div>
          </a>
          <button type="submit">Enviar mensagem</button>
        </div>
      </form>
    </div>
  );
}
