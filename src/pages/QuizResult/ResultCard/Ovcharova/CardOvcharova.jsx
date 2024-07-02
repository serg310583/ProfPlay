import styles from './CardOvcharova.module.scss'

export function CardOvcharova({ maxRecommendations, otherRecommendations }) {
	const recommendations = maxRecommendations ?? otherRecommendations
	const isOtherRecommendations = recommendations === otherRecommendations
	return (
		<div>
			{recommendations.map((section, index) => (
				<div
					key={index}
					className={`${styles.section} ${
						isOtherRecommendations ? styles.other : ''
					}`}
				>
					<div className={styles.section_block}>
						<div className={styles.section_block_wrapper}>
							<img
								src={`assets/images/quizOvchar/quizOvcharovaResult/${section.image}.png`}
								alt='image description'
							/>
							<h3>{section.description}</h3>
						</div>
						<div className={styles.text}>
							<p>{section.content}</p>
						</div>
					</div>
				</div>
			))}
		</div>
	)
}
