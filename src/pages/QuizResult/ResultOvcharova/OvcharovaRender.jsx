import { Link } from 'react-router-dom'
import { TelegramShareButton } from 'react-share'
import { CardOvcharova } from '../ResultCard/Ovcharova/CardOvcharova'
import { ScaleOvcharova } from '../ResultScales/Ovcharova/ScaleOvcharova'
import styles from './../quizResult.module.scss'
import moreView from '/assets/images/quizKlimov/quizKlimovResult/back.svg'

export function OvcharovaRender({
	results,
	maxRecommendations,
	showRecommendations,
	otherRecommendations,
	toggleRecommendations,
	currentUrl,
}) {
	return (
		<section className={styles.sectionResult}>
			<div className={styles.sectionResult_window}>
				<div className={styles.btnClose}>
					{/* <Link to={'https://profplay.tilda.ws'}>
						<Close />
					</Link> */}
				</div>
				<div className={styles.titleContainer}>
					<h2 className={styles.title}>Результаты тестирования</h2>
				</div>
				{/*Блок со шкалами*/}
				<ScaleOvcharova results={results} />
				<div className={styles.descriptionResults}>
					<h2 className={styles.title}>Описание результатов:</h2>
				</div>
				{/* Блок описания максимального результата */}
				<CardOvcharova
					maxRecommendations={maxRecommendations}
					showRecommendations={showRecommendations}
				/>
				{/* Кнопка показать больше */}
				<div className={styles.btnMore}>
					<button onClick={toggleRecommendations}>
						{showRecommendations
							? 'Скрыть неактивные шкалы '
							: 'Посмотреть неактивные шкалы '}
						<img
							className={`${
								showRecommendations ? styles.active : styles.notActive
							}`}
							src={moreView}
							alt=''
						/>
					</button>
				</div>
				{/* Блоки описаний других результатов */}
				{showRecommendations ? (
					<CardOvcharova
						otherRecommendations={otherRecommendations}
						showRecommendations={showRecommendations}
					/>
				) : null}

				<div className={styles.consultationBlock}>
					<TelegramShareButton
						title={
							'Перейдя по ссылке можно посмотреть результаты прохождения теста определения самооценки по Р.В. Овчаровой'
						}
						url={currentUrl}
						className={styles.social}
					>
						<p className={styles.social_title}>
							Скопировать ссылку на результат
						</p>

						<img
							className={styles.social_link}
							src={'/assets/icons/tg.svg'}
							alt='telegram'
						/>
					</TelegramShareButton>
					<hr className={styles.dividing} />
					<p className={styles.slogan}>
						Понимание себя — ключ к успешной карьере! Вы уже получили
						предварительное представление о своих склонностях и интересах.
						Теперь настало время углубиться в анализ вместе с профессионалом.{' '}
						<br />
						Наш профориентолог поможет интерпретировать результаты теста,
						выявить уникальные черты характера и найти наиболее подходящую
						профессию, соответствующую потребностям и желаниям.
					</p>
					<Link to={'https://profplay.tilda.ws/#rec727412895'}>
						<button className={styles.btn_result}>
							Консультация профориентолога
						</button>
					</Link>
				</div>
			</div>
		</section>
	)
}
