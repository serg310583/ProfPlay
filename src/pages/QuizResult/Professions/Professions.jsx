import styles from './Professions.module.scss'
export function Professions({ maxRecommendations }) {
	return (
		<div className={styles.professionsBlock}>
			<p className={styles.professionsBlock_title}>
				Вам могут подойти профессии:
			</p>

			<ul className={styles.professionsBlock_list}>
				{maxRecommendations.map((item, index) => (
					<ul key={index} className={styles.professionsBlock_list}>
						{item.recommendations.map((recommendation, idx) => (
							<li key={idx} className={styles.professionsBlock_list_item}>
								{recommendation.text}
								{recommendation.links && recommendation.links.length > 0 && (
									<div className={styles.inRow}>
										{recommendation.links.map(
											(link, linkIdx) =>
												link.link !== '#' && (
													<a key={linkIdx} href={link.link} target='blank'>
														{link.title ? link.title : ' '}
													</a>
												)
										)}
									</div>
								)}
							</li>
						))}
						{<br></br>}
					</ul>
				))}
			</ul>
		</div>
	)
}
