import { nanoid } from "nanoid";
import { useState } from "react";
import styles from "./index.module.scss";
export type BaseEmailEnter = {
  children?: React.ReactNode;
  // Override these as needed - Remember, optional props goes at the end.
};

function BaseEmailEnter({ children }: BaseEmailEnter) {
  return (
    <div className={styles.container}>
      <form className={styles.entry_form_1}>
        <input
          placeholder="Digite seu E-mail Aqui"
          style={{
            
          }}
        />
        <button
          type="submit"
          aria-label="add-message-to-list-btn"
        >
          Enviar
        </button>
      </form>
      <p>
        Só mandaremos e-mail sobre o lançamento do site, não se preocupe!
      </p>
    </div>
  );
}
export default BaseEmailEnter;
