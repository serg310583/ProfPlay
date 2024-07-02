import { useState } from 'react'
import styles from './ResultCard.module.scss'

export function ResultCard({ maxRecommendations, otherRecommendations }) {
	const recommendations = maxRecommendations ?? otherRecommendations
	const isOtherRecommendations = recommendations === otherRecommendations

	const [showDescription, setShowDescription] = useState({})
	const toggleDescription = (index) => {
		setShowDescription((prevState) => ({
			...prevState,
			[index]: !prevState[index],
		}))
	}

	return (
		<div>
			{recommendations.map((section, index) => (
				<div
					key={index}
					className={`${styles.section} ${
						isOtherRecommendations ? styles.other : ''
					} ${showDescription[index] ? styles.expanded : ''}`}
				>
					<div className={styles.section_block}>
						<div className={styles.section_block_wrapper}>
							<div className={styles.title}>
								<img
									src={`assets/images/quizResultCard/${section.image}.png`}
									alt='image description'
								/>
								<h3>{section.description}</h3>
							</div>
							<ul className={styles.list}>
								{section.qualities.map((quality, i) => (
									<li key={i} className={styles.list_item}>
										{quality}
									</li>
								))}
							</ul>
						</div>

						{/* Скрыть-показать описание */}
						{showDescription[index] ? (
							<div
								className={`${styles.text} ${
									showDescription[index] ? styles.expanded : ''
								}`}
							>
								{section.content.split('/n').map((paragraph, i) => (
									<p key={i}>{paragraph}</p>
								))}
							</div>
						) : null}
						<div className={styles.button_more}>
							<button
								onClick={() => {
									toggleDescription(index)
								}}
							>
								{showDescription[index]
									? 'Скрыть описание '
									: 'Смотреть описание '}
							</button>
						</div>
					</div>
				</div>
			))}
		</div>
	)
}
