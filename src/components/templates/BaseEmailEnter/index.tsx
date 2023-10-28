import { nanoid } from "nanoid";
import { useState } from "react";
import styles from "./index.module.scss";
import { useMutation } from "@tanstack/react-query";
export type BaseEmailEnter = {
  children?: React.ReactNode;
  // Override these as needed - Remember, optional props goes at the end.
};
function postNewLead(data:any) {
  return fetch("https://pack-shop-api.onrender.com/v1/leads", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: data.email }),
  }).then((response) => response.json());
}

function BaseEmailEnter({ children }: BaseEmailEnter) {
    const { mutate, isLoading, isError, isSuccess } = useMutation(postNewLead);

    const handleSubmit = (formData:any) => {
      // Chame a função mutate com o objeto de dados a serem enviados
      mutate(formData);
    };
  return (
    <div className={styles.container}>
      <form
        className={styles.entry_form_1}
      >
        <input placeholder="Digite seu E-mail Aqui" style={{}} />
        <button type="submit" aria-label="add-message-to-list-btn">
          {isLoading ? "Enviando..." : "Enviar"}
        </button>
      </form>
      <p>Só mandaremos e-mail sobre o lançamento do site, não se preocupe!</p>
    </div>
  );
}
export default BaseEmailEnter;
