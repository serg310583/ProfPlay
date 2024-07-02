import { useEffect } from 'react'
import styles from './ImageTest.module.scss'

export function ImageTest({ questionImage, questionText }) {
	useEffect(() => {
		// Предварительная загрузка изображений для следующего вопроса
		const nextQuestionImage = parseInt(questionImage) + 1
		const img = new Image()
		img.src = `/assets/images/quizOvchar/options/svg/${nextQuestionImage}.svg`
	}, [questionImage])
	return (
		<div className={styles.wrapperImg}>
			<picture>
				<img
					src={`/assets/images/quizOvchar/options/svg/${questionImage}.svg`}
					alt='image of questions'
				/>
			</picture>

			<p className={styles.question}> {questionText}</p>
		</div>
	)
}
