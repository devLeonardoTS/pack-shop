import { useFormik } from "formik";
import style from "./index.module.scss";

const LoginForm = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => console.log(values),
  });

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
