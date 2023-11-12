import { useBusinessProductListData } from "@/common/hooks/useProductData";
import { useUserSessionStore } from "@/common/stores/UserSessionStore";
import { Pagination } from "@mui/material";
import { useState } from "react";
import style from "./index.module.scss";
import ProductListItem from "./ProductListItem";

export type ProductAreaProps = {};

function DashboardProductArea({}: ProductAreaProps) {
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
          <div className={style["pagination"]}>
            <Pagination
              variant="outlined"
              shape="rounded"
              count={pages}
              page={page}
              onChange={(ev, value) => setPage(value)}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default DashboardProductArea;
