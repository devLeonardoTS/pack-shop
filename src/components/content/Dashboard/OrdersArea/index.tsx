import style from "./index.module.scss";

export type OrdersAreaProps = {};

function OrdersArea({}: OrdersAreaProps) {
  return (
    <main className={style.container}>
      <div className={style.content}>
        <h1>Área de Pedidos</h1>
      </div>
    </main>
  );
}

export default OrdersArea;
