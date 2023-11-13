import { useConsumerCartStore } from "@/common/stores/ConsumerCartStore";
import { useUserSessionStore } from "@/common/stores/UserSessionStore";
import { useFormik } from "formik";
import { useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import style from "./index.module.scss";

const LoginForm = () => {
  const MySwal = withReactContent(Swal);

  const { signIn, status, error } = useUserSessionStore();

  const { clearItems } = useConsumerCartStore();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      signIn(
        { email: values.email, password: values.password },
        {
          onSuccess: async () => {
            MySwal.fire({
              title: <p>Usuário autenticado</p>,
              toast: true,
              timerProgressBar: true,
              timer: 2000,
              position: "bottom-right",
              icon: "success",
            });
          },
          onError: async () => {
            MySwal.fire({
              icon: "error",
              title: <p>Credenciais inválidas</p>,
            });
          },
        },
      );
    },
  });

  useEffect(() => {
    if (status === "loading") {
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
  }, [status]);

  return (
    <form onSubmit={formik.handleSubmit} className={style.container}>
      <fieldset className={style.content}>
        <legend>Login</legend>
        <div className={style["input-group"]}>
          <label htmlFor="email">E-mail</label>
          <input
            type="text"
            id="email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            // required
          />
        </div>

        <div className={style["input-group"]}>
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            // required
          />
        </div>

        <a href="#" className={`txt-sm`}>
          Esqueci minha senha
        </a>

        <div className={style["button-group"]}>
          <button type="submit">ENTRAR</button>
          <a href="cadastro" className={`link`}>
            CRIAR CONTA
          </a>
        </div>
      </fieldset>
    </form>
  );
};

export default LoginForm;
