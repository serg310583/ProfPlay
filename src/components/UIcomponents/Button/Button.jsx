import styles from './Button.module.scss';

export function CustomButton({ textButton }) {
  return <button className={styles.button}>{textButton}</button>;
}
