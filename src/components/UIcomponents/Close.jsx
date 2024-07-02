import styles from './Close.module.scss'
import { SvgClose } from './svgClose'

export function Close({ onClick }) {
	return (
		<button onClick={onClick} className={styles.closeWrapper}>
			<SvgClose />
		</button>
	)
}
