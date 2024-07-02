import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { selectQuizData } from '../../../core/store/reducers/quiz'
import { selectStep } from '../../../core/store/reducers/step'
import './Notificator.css'
import smileIcon from '/assets/icons/smile.png'
export function Notificator() {
	const quizData = useSelector(selectQuizData) // Выберите данные теста из хранилища
	const step = useSelector(selectStep) // Выберите текущий шаг
	const prevStepRef = useRef(0) // Ссылка на предыдущий шаг

	useEffect(() => {
		// Объявляем текущий и предыдущий шаг
		const prevStep = prevStepRef.current
		if (
			quizData &&
			quizData.questions &&
			prevStep < step && // Проверка перехода на следующий шаг
			step === Math.floor(quizData.questions.length / 2)
		) {
			toast.info('Так держать!', {
				icon: (
					<img src={smileIcon} alt='smile icon' className='customToastIcon' />
				),
				position: 'bottom-center',
				autoClose: 5000,
				closeButton: false,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				className: 'customToast', // Примените кастомный класс
				bodyClassName: 'customToastBody', // Примените кастомный класс к телу уведомления
			})
		}
		// Обновляем значение prevStepRef после всех проверок и вызовов
		prevStepRef.current = step
	}, [step, quizData])

	return (
		<div>
			<ToastContainer />
		</div>
	)
}
