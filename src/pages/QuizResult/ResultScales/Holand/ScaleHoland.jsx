import styles from './ScaleHoland.module.scss'

export function ScaleHoland({ results }) {
	return (
		<div className={styles.resultHolandScales}>
			{
				<ul className={styles.scaleCharacter}>
					{results.map((scale) => (
						<li key={scale.result_id} className={styles.scaleCharacter__scale}>
							<p
								className={styles.scaleCharacter__scale_name}
								style={{
									...(scale.points !==
										Math.max(...results.map((item) => item.points)) && {
										backgroundImage: `url(null)`,
									}), //убираем background у неактивных шкал
								}}
							>
								{scale.description}
							</p>
							<ul key={scale.result_id} className={styles.points}>
								{[...Array(14)].map((_, i) => (
									<li
										key={i}
										className={styles.point}
										style={{
											backgroundColor: i < scale.points ? '#005de9' : '#EAEAEA',
										}}
									></li>
								))}
							</ul>
						</li>
					))}
				</ul>
			}
		</div>
	)
}
