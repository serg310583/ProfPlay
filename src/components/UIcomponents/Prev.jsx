import styles from './Prev.module.scss'
import { SvgPrev } from './svgPrev'

export function Prev({ onClickPrev }) {
	return (
		<button className={styles.prevWrapper} onClick={onClickPrev}>
			<SvgPrev />
		</button>
	)
}
