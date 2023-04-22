import { nanoid } from "nanoid";
import { useState } from "react";
import styles from "./index.module.scss";

export type BasicBlockText = {
  children?: React.ReactNode;
  // Override these as needed - Remember, optional props goes at the end.
};

function BasicBlockText({ children }: BasicBlockText) {
  return (
    <div>
      <h2 style={{
        fontFamily: 'Imprima, sans-serif', 
      }}>
        PackShop, encontre o que você precisa, venda e sem limites.
      </h2>
    </div>
  );
}
export default BasicBlockText;
