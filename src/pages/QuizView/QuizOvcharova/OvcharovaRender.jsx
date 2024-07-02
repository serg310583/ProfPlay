import { Link } from 'react-router-dom'
import { Close } from '../../../components/UIcomponents/Close'
import { Notificator } from '../../../components/UIcomponents/Notificator/Notificator'
import { Prev } from '../../../components/UIcomponents/Prev'
import { QuizModal } from './../QuizView-PopUp/QuizModal'
import styles from './../QuizView.module.scss'
import { StepBar } from './../StepBar/StepBar'
import { AnswerRadio } from './AnswerRadio/AnswerRadio'
import { ImageTest } from './ImageTest/ImageTest'

export function OvcharovaRender({
	isOpen,
	onClickPrev,
	setIsOpen,
	step,
	testLength,
	questionImage,
	questionText,
	question,
	selectedAnswers,
	onClickVariant,
	sendNotFullDataToServer,
	sendFullDataToServer,
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
				<div className={styles.wrapper__progress}>
					<StepBar step={step} testLength={testLength} />
				</div>
				<Close onClick={() => setIsOpen(true)} />
			</div>
			<div className={styles.wrapper__question}>
				<div className={styles.title_ovchar}>
					{'Оцените, в какой мере это утверждение влияет на выбор профессии.'}
				</div>
			</div>
			<ImageTest questionImage={questionImage} questionText={questionText} />
			<AnswerRadio
				step={step}
				question={question}
				selectedAnswers={selectedAnswers}
				onClickVariant={onClickVariant}
				nextQuestion={nextQuestion}
			/>
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
