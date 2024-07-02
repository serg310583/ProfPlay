import styles from './StepBar.module.scss'

export function StepBar({ step, testLength }) {
	const steps = [] // Массив для хранения всех элементов
	for (let i = 0; i < testLength; i++) {
		let currentClass = styles.notPassed // Начальный класс для текущего элемента
		if (i < step) {
			// Если индекс текущего элемента меньше шага, добавляем класс 'passed'
			currentClass = styles.passed
		}

		if (i === step) {
			// Если индекс текущего элемента равен шагу, добавляем класс 'current'
			currentClass += ' ' + styles.current
		}

		steps.push(
			<div key={i} className={currentClass}></div> // Добавляем элемент <div> в массив
		)
	}

	return <div className={styles.wrapper}>{steps}</div>
}
