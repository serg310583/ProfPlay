import { Link } from 'react-router-dom';
import s from './Consultation.module.scss';

export function Consultation() {
  return (
    <div className={s.consultation_Wrapper}>
      <div className={s.containerSessions}>
        <div className={s.labelSessions}>2 сессии по 40 минут</div>
      </div>
      <div className={s.titleContainer}>
        <img
          src='/assets/images/profile/consultation.png'
          alt='consultation'
          className={s.imageConsultation}
        />
        <h3 className={s.title}>
          Консультации по предрасположенности <br /> школьника к профессии
        </h3>
      </div>
      <p className={s.textConsultation}>
        ✔ Индивидуальная онлайн-консультация в 2 сессии <br /> ✔ Проведение
        специализированных тестов для определения интересов, способностей и
        целей вашего ребенка <br /> ✔ Анализ личностных черт ребенка опытным
        профориентологом <br /> ✔ Рекомендации по выбору образовательного пути и
        карьерных перспектив <br /> ✔ Пакет поможет вашему ребенку успешно
        реализовать таланты и достичь успеха в будущей профессии
      </p>
      <div className={s.priceBlock}>
        <span className={s.price}>3000 ₽</span>{' '}
        <span className={s.textPrice}>за сессию *возможна оплата баллами</span>
      </div>
      <div className={s.buttonContainer}>
        <Link
          to={'https://profplay.tilda.ws/#rec727412895'}
          className={s.buttonLink}
        >
          Консультация профориентолога
        </Link>
      </div>
    </div>
  );
}
