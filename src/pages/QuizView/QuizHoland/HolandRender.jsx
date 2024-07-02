import { Link } from 'react-router-dom'
import { Close } from '../../../components/UIcomponents/Close'
import { Notificator } from '../../../components/UIcomponents/Notificator/Notificator'
import { Prev } from '../../../components/UIcomponents/Prev'
import { Answer } from '../Answer/Answer'
import { QuizModal } from './../QuizView-PopUp/QuizModal'
import styles from './../QuizView.module.scss'
import { StepBar } from './../StepBar/StepBar'

export function HolandRender({
	isOpen,
	onClickPrev,
	setIsOpen,
	questionText,
	step,
	question,
	selectedAnswers,
	onClickVariant,
	testLength,
	sendNotFullDataToServer,
	sendFullDataToServer,
	quizHoland,
	nextQuestion,
}) {
	return (
		<div className={styles.wrapper}>
			<QuizModal
				sendNotFullDataToServer={sendNotFullDataToServer}
				open={isOpen}
				onClose={() => setIsOpen(false)}
			/>
			<div className={styles.wrapper__button}>
				<Prev onClickPrev={onClickPrev} />
				<Close onClick={() => setIsOpen(true)} />
			</div>
			<div className={styles.wrapper__question}>
				<div className={styles.wrapper__question}>
					<div className={styles.title}>{questionText}</div>
				</div>
			</div>
			<Answer
				step={step}
				question={question}
				selectedAnswers={selectedAnswers}
				onClickVariant={onClickVariant}
				quizHoland={quizHoland}
				nextQuestion={nextQuestion}
			/>
			<div className={styles.wrapper__progressHoland}>
				<StepBar step={step} testLength={testLength} />
			</div>
			<Notificator />
			{step == testLength && (
				<Link
					className={styles.wrapper__resultBtn}
					onClick={sendFullDataToServer}
				>
					Узнать результаты
				</Link>
			)}
		</div>
	)
}
