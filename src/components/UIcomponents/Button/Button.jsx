import styles from './Button.module.scss';

export function Button({ textButton }) {
  return <button className={styles.button}>{textButton}</button>;
}
