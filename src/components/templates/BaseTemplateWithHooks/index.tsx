import { nanoid } from "nanoid";
import { useState } from "react";
import styles from "./index.module.scss";

export type BaseTemplateWithHooksProps = {
  children?: React.ReactNode;
  // Override these as needed - Remember, optional props goes at the end.
};

export function useBaseTemplateWithHooks() {
  const [list, setList] = useState<Array<{ id: string; text: string }>>([]);
  const [message, setMessage] = useState("");

  function addMessageToList() {
    if (!message.trim()) {
      return;
    }
    setList([...list, { id: nanoid(10), text: message }]);
    setMessage("");
  }

  function rmvMessageById(id: string) {
    setList(list.filter((item) => item.id !== id));
  }

  return {
    list,
    message,
    setMessage,
    addMessageToList,
    rmvMessageById,
  };
}

function BaseTemplateWithHooks({ children }: BaseTemplateWithHooksProps) {
  const { list, message, setMessage, addMessageToList, rmvMessageById } =
    useBaseTemplateWithHooks();

  return (
    <div
      className={styles.container}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        border: "1px solid black",
        padding: 16,
        minWidth: 300,
        maxWidth: 300,
        overflowWrap: "anywhere",
      }}
      data-test="form-message-box"
    >
      <form
        onSubmit={(e) => {
          e.stopPropagation();
          e.preventDefault();
          addMessageToList();
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <label htmlFor="message-list">Send your message </label>
          <input
            id="message-list"
            type="text"
            value={message}
            placeholder="Type it here"
            aria-label="message-list"
            onChange={(e) => setMessage(e.target.value)}
            style={{ padding: 4 }}
            data-test="input-msg"
          />
          <button
            type="submit"
            aria-label="add-message-to-list-btn"
            style={{ padding: 4 }}
            data-test="btn-submit-msg"
          >
            Send
          </button>
        </div>
      </form>
      <hr />
      <ul
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          listStyle: "none",
          margin: 0,
          padding: 0,
        }}
        data-test="list-msg"
      >
        {list.map((item) => {
          return (
            <li key={item.id} style={{ border: "1px solid gray", padding: 4 }}>
              <div>
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    gap: 8,
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <p style={{ fontSize: "0.75rem" }}>
                    <b>Msg #</b> {item.id}
                  </p>
                  <button
                    style={{ width: 25, height: 25 }}
                    onClick={(e) => rmvMessageById(item.id)}
                    data-test="btn-rmv-msg"
                  >
                    x
                  </button>
                </div>
                <hr style={{ margin: "8px 0px" }} />
                <p data-test="p-msg">{item.text}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default BaseTemplateWithHooks;
