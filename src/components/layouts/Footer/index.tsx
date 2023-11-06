const Footer = () => {
  return (
    <footer className={`dft-padding`}>
      <small>
        © {new Date().getFullYear()} -{" "}
        <a className={`link`} href="https://github.com/devLeonardoTS/pack-shop">
          PackShop Marketplace
        </a>
      </small>
    </footer>
  );
};

export default Footer;
