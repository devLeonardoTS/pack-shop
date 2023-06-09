import styles from "./index.module.scss";

export type PrimaryLayoutProps = {
  children?: React.ReactNode;
};

function PrimaryLayout({ children }: PrimaryLayoutProps) {
  return <div className={styles.container}>{children}</div>;
}

export default PrimaryLayout;
