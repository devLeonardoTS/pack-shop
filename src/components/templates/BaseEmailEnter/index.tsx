import { nanoid } from "nanoid";
import { useState } from "react";
import styles from "./index.module.scss";

export type BaseEmailEnter = {
  children?: React.ReactNode;
  // Override these as needed - Remember, optional props goes at the end.
};

function BaseEmailEnter({ children }: BaseEmailEnter) {
  return (
    <div>
      <form
        style={{
          border: "1px solid",
          maxWidth: "300px",
          display: "flex",
          boxShadow:"8px 8px #3F0957"
        }}
      >
        <input
          placeholder="Digite seu E-mail Aqui"
          style={{
            fontFamily: "Bebas Neue",
            maxWidth: "300px",
            border: "0px solid",
            padding: 4,
            fontSize: "1.7em",
            width: "100%",
          }}
        />
        <button
          type="submit"
          aria-label="add-message-to-list-btn"
          style={{
            padding: 4,
            backgroundColor: "rgb(0,0,0,0)",
            border: "0px solid",
            fontSize: "1.3em",
            fontFamily: "Bebas Neue",
            borderLeft:"1px solid"
          }}
          data-test="btn-submit-msg"
        >
          Enviar
        </button>
      </form>
      <p
        style={{
          fontFamily: "monospace",
          margin:"10px 0px 0px 0px"
        }}
      >
        Só mandaremos e-mail sobre o lançamento do site, não se preocupe!
      </p>
    </div>
  );
}
export default BaseEmailEnter;
