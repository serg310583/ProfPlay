import styles from './AnswerRadio.module.scss'

export function AnswerRadio({ onClickVariant, question, selectedAnswers }) {
	const selectedAnswersValues = Object.values(selectedAnswers) // для отображения выбранных ответов извлекаем значения из объекта для сравнения с текущим.

	return (
		<div className={styles.answers}>
			<span>никак не влияет</span>
			<div className={styles.answers__buttons}>
				{question.map((item) => (
					<button
						onClick={() => {
							onClickVariant(item.id, item.value)
						}}
						key={item.id}
						className={styles.button}
						style={{
							borderColor: selectedAnswersValues.includes(item.id)
								? '#f3ce00'
								: '',
						}}
					></button>
				))}
			</div>

			<span>очень сильно влияет</span>
		</div>
	)
}
