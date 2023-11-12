import { EHttpStatusCode } from "@/common/enums/EHttpStatusCode";
import { EImageType } from "@/common/enums/EImageType";
import { EProductType } from "@/common/enums/EProductType";
import {
  useCreateProduct,
  useCreateProductImage,
} from "@/common/hooks/useProductMutation";
import { useDashboardStore } from "@/common/stores/BusinessDashboardStore";
import { useUserSessionStore } from "@/common/stores/UserSessionStore";
import RippleButton from "@/components/common/RippleButton";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import style from "./index.module.scss";

const ProductForm = () => {
  const { user } = useUserSessionStore();

  const [imagePreview, setImagePreview] = useState<any>();
  const [file, setFile] = useState<any>();

  const MySwal = withReactContent(Swal);

  const { setDashboardContent } = useDashboardStore();

  const {
    mutateAsync: createProduct,
    isSuccess: isProductCreated,
    isLoading: isProductCreationLoading,
    error: productCreationError,
  } = useCreateProduct();

  const {
    mutateAsync: createProductImage,
    isSuccess: isProductImageCreated,
    isLoading: isProductImageCreationLoading,
    error: productImageCreationError,
  } = useCreateProductImage();

  const formik = useFormik({
    initialValues: {
      sku: "",
      name: "",
      description: "",
      brand: "",
      price: "",
      stock: "",
      weightKg: "",
      lengthCm: "",
      heightCm: "",
      widthCm: "",
      manufacturedAt: "",
      expiresAt: "",
      productType: "",
      productCategories: "",
      productTags: "",
      isAvailable: "",
    },
    onSubmit: async (values) => {
      console.log("[ProductForm]: Creating product data.");

      const productResponse = await createProduct({
        businessId: user?.businessId,
        sku: values.sku,
        name: values.name,
        description: values.description,
        brand: values.brand,
        price: Number(values.price),
        stock: Number(values.stock),
        weightKg: Number(values.weightKg),
        lengthCm: Number(values.lengthCm),
        heightCm: Number(values.heightCm),
        widthCm: Number(values.widthCm),
        manufacturedAt: new Date(values.manufacturedAt),
        expiresAt: new Date(values.expiresAt),
        productType: values.productType as EProductType,
        productCategories: values.productCategories,
        productTags: values.productTags,
        isAvailable: Boolean(values.isAvailable),
      });

      if (productResponse.data) {
        console.log("[ProductForm]: Creating product image data.");
        await createProductImage({
          file: file,
          productId: productResponse.data.id,
          imageType: EImageType.PRODUCT_DISPLAY_1,
        });
      }
    },
  });

  useEffect(() => {
    if (file && file instanceof File) {
      setImagePreview(URL.createObjectURL(file));
    } else if (file) {
      setImagePreview(file);
    } else {
      setImagePreview(undefined);
    }
  }, file);

  useEffect(() => {
    if (isProductCreationLoading || isProductImageCreationLoading) {
      MySwal.fire({
        title: "Loading...",
        toast: true,
        showCloseButton: false,
        showConfirmButton: false,
        position: "bottom-right",
        didOpen: () => {
          MySwal.showLoading(null);
        },
      });
    }

    if (isProductCreated && isProductImageCreated) {
      MySwal.fire({
        title: <p>Produto cadastrado!</p>,
        toast: true,
        timerProgressBar: true,
        timer: 2000,
        position: "bottom-right",
        icon: "success",
      });
    }

    if (productCreationError) {
      const reqError = productCreationError as any;
      const error = reqError?.response?.data;

      console.log(reqError);

      let message;
      switch (error.statusCode) {
        case EHttpStatusCode.BAD_REQUEST:
          message =
            "Alguns dos dados são inválidos, verifique e tente novamente.";
          break;
        default:
          message =
            "Algo deu errado ao cadastrar o produto, tente novamente mais tarde";
          break;
      }

      MySwal.fire({
        title: <p>Ops...</p>,
        text: message,
        toast: true,
        position: "bottom-right",
        icon: "error",
      });
    }

    if (productImageCreationError) {
      const reqError = productImageCreationError as any;
      const error = reqError?.response?.data;

      let message;
      switch (error.statusCode) {
        case EHttpStatusCode.BAD_REQUEST:
          message =
            "A imagem enviada está no formato correto? Verifique e tente novamente.";
          break;
        default:
          message = "A imagem não foi cadastrada, tente novamente mais tarde";
          break;
      }

      MySwal.fire({
        title: <p>Ops...</p>,
        text: message,
        toast: true,
        position: "bottom-right",
        icon: "error",
      });
    }
  }, [
    isProductCreationLoading,
    isProductImageCreationLoading,
    isProductCreated,
    isProductImageCreated,
    productCreationError,
    productImageCreationError,
  ]);

  return (
    <form
      id="product-form"
      onSubmit={formik.handleSubmit}
      className={style.form}
    >
      <fieldset className={style.fieldset}>
        <legend>Produto</legend>
        <div className={style["input-group"]}>
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            required
          />
        </div>

        <div className={style["input-group"]}>
          <label htmlFor="description">Descrição</label>
          <textarea
            id="description"
            name="description"
            onChange={formik.handleChange}
            value={formik.values.description}
          />
        </div>

        <div className={style["input-group"]}>
          <label htmlFor="brand">Marca</label>
          <input
            type="text"
            id="brand"
            name="brand"
            onChange={formik.handleChange}
            value={formik.values.brand}
            required
          />
        </div>

        <div className={style["input-group"]}>
          <label htmlFor="price">Preço</label>
          <input
            type="number"
            id="price"
            name="price"
            onChange={formik.handleChange}
            value={formik.values.price}
            required
          />
        </div>

        <div className={style["input-group"]}>
          <label htmlFor="stock">Qtd. em estoque</label>
          <input
            type="number"
            id="stock"
            name="stock"
            onChange={formik.handleChange}
            value={formik.values.stock}
            required
          />
        </div>

        <div className={style["input-group"]}>
          <label htmlFor="weightKg">Peso em Kg.</label>
          <input
            type="number"
            id="weightKg"
            name="weightKg"
            onChange={formik.handleChange}
            value={formik.values.weightKg}
            required
          />
        </div>

        <div className={style["input-group"]}>
          <label htmlFor="lengthCm">Cumprimento em Cm.</label>
          <input
            type="number"
            id="lengthCm"
            name="lengthCm"
            onChange={formik.handleChange}
            value={formik.values.lengthCm}
            required
          />
        </div>

        <div className={style["input-group"]}>
          <label htmlFor="heightCm">Altura em Cm.</label>
          <input
            type="number"
            id="heightCm"
            name="heightCm"
            onChange={formik.handleChange}
            value={formik.values.heightCm}
            required
          />
        </div>

        <div className={style["input-group"]}>
          <label htmlFor="widthCm">Largura em Cm.</label>
          <input
            type="number"
            id="widthCm"
            name="widthCm"
            onChange={formik.handleChange}
            value={formik.values.widthCm}
            required
          />
        </div>

        <div className={style["input-group"]}>
          <label htmlFor="manufacturedAt">Data de fabricação</label>
          <input
            type="date"
            id="manufacturedAt"
            name="manufacturedAt"
            onChange={formik.handleChange}
            value={formik.values.manufacturedAt}
            required
          />
        </div>

        <div className={style["input-group"]}>
          <label htmlFor="expiresAt">Data de validade</label>
          <input
            type="date"
            id="expiresAt"
            name="expiresAt"
            onChange={formik.handleChange}
            value={formik.values.expiresAt}
            required
          />
        </div>

        <div className={style["input-group"]}>
          <label htmlFor="sku">SKU</label>
          <input
            type="text"
            id="sku"
            name="sku"
            onChange={formik.handleChange}
            value={formik.values.sku}
            required
          />
        </div>

        <div className={style["input-group"]}>
          <label htmlFor="productType">Tipo de Produto</label>
          <select
            name="productType"
            id="productType"
            onChange={formik.handleChange}
            required
          >
            <option value="">Selecione um tipo</option>
            {Object.entries(EProductType).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
        </div>

        <div className={style["input-group"]}>
          <label htmlFor="productCategories">{`Categorias (Separe com ";")`}</label>
          <input
            type="text"
            id="productCategories"
            name="productCategories"
            onChange={formik.handleChange}
            value={formik.values.productCategories}
            required
          />
        </div>

        <div className={style["input-group"]}>
          <label htmlFor="productTags">{`Tags (Separe com ";")`}</label>
          <input
            type="text"
            id="productTags"
            name="productTags"
            onChange={formik.handleChange}
            value={formik.values.productTags}
          />
        </div>

        <div className={style["input-group"]}>
          <div className={style["btn-container"]}>
            <RippleButton>
              <label htmlFor="productImage" className={`btn`}>
                <img
                  src={imagePreview || "./images/logomark.svg"}
                  height={192}
                  width={192}
                  alt={"Prévia da imagem do produto"}
                />
              </label>
            </RippleButton>
          </div>
          <input
            type="file"
            id="productImage"
            name="productImage"
            accept="image/*"
            hidden
            onChange={(ev) => {
              setFile(ev.target.files?.[0]);
            }}
          />
        </div>

        <div className={style["checkbox-group"]}>
          <input
            type="checkbox"
            id="isAvailable"
            name="isAvailable"
            onChange={formik.handleChange}
            value={formik.values.isAvailable}
          />
          <label htmlFor="isAvailable">Produto já disponível?</label>
        </div>
      </fieldset>

      <div className={style["button-group"]}>
        <button type="submit">CADASTRAR</button>
        <button
          type="button"
          className={`btn-as-link`}
          onClick={() => setDashboardContent()}
        >
          VOLTAR
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
