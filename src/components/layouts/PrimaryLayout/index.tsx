import Footer from "../Footer";
import PrimaryNavbar from "../Navbars/PrimaryNavbar";

export type PrimaryLayoutProps = {
  children?: React.ReactNode;
};

function PrimaryLayout({ children }: PrimaryLayoutProps) {
  return (
    <>
      <PrimaryNavbar />
      {children}
      <Footer />
    </>
  );
}

export default PrimaryLayout;
