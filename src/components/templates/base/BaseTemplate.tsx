import styles from "./BaseTemplate.module.scss";

export type BaseTemplateProps = {
  sampleTextProp: string;
  children?: React.ReactNode;
  // Override these as needed - Remember, optional props goes at the end.
};

function BaseTemplate({ sampleTextProp, children }: BaseTemplateProps) {
  return (
    <div className={styles.container}>
      <h1 data-test="sample-text">{sampleTextProp}</h1>
      {children}
    </div>
  );
}

export default BaseTemplate;
