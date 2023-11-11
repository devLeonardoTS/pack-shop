import ProductForm from "@/components/forms/ProductForm";
import style from "./index.module.scss";

export type ProductFormAreaProps = {
  children?: React.ReactNode;
};

function ProductFormArea({ children }: ProductFormAreaProps) {
  return (
    <main className={style.container}>
      <div className={style.content}>
        <ProductForm />
      </div>
    </main>
  );
}

export default ProductFormArea;
