import { useBusinessProductListData } from "@/common/hooks/useProductData";
import { useBusinessDashboardStore } from "@/common/stores/BusinessDashboardStore";
import { useUserSessionStore } from "@/common/stores/UserSessionStore";
import RippleButton from "@/components/common/RippleButton";
import { Pagination } from "@mui/material";
import { useState } from "react";
import ProductFormArea from "../ProductFormArea";
import style from "./index.module.scss";
import ProductListItem from "./ProductListItem";

export type ProductAreaProps = {};

function DashboardProductArea({}: ProductAreaProps) {
  const { setDashboardContent } = useBusinessDashboardStore();

  const { user } = useUserSessionStore();
  const { businessId } = user || {};

  const [page, setPage] = useState(1);

  const { data: productListQuery } = useBusinessProductListData(
    businessId || 0,
    {
      page,
    },
  );

  const {
    data: productList,
    next,
    previous,
    pages,
    total,
  } = productListQuery || {};

  return (
    <main className={style.container}>
      <div className={style.content}>
        <h1>Produtos</h1>
        <p>
          <span>Produtos encontrados: </span>
          {total}
        </p>

        <div className={style["product-list-area"]}>
          <ul className={style["product-list"]}>
            {productList
              ? productList.map((product) => (
                  <ProductListItem
                    key={`product-${product.id}`}
                    product={product}
                  />
                ))
              : null}
          </ul>
          <div className={style["actions-area"]}>
            <Pagination
              variant="outlined"
              shape="rounded"
              count={pages}
              page={page}
              onChange={(ev, value) => setPage(value)}
            />
          </div>
          <div className={style["sticky-div"]}>
            <RippleButton
              className={style["add-btn"]}
              onClick={() => setDashboardContent(<ProductFormArea />)}
            >
              Novo produto
            </RippleButton>
          </div>
        </div>
      </div>
    </main>
  );
}

export default DashboardProductArea;
