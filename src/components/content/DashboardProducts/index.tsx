import ProductForm from "@/components/forms/ProductForm";
import style from "./index.module.scss";

export type DashboardProductsProps = {
  children?: React.ReactNode;
};

function DashboardProducts({ children }: DashboardProductsProps) {
  return (
    <main className={style.container}>
      <div className={style.content}>
        <ProductForm />
      </div>
    </main>
  );
}

export default DashboardProducts;
