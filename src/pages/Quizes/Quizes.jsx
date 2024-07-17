import { useDispatch, useSelector } from 'react-redux';
import { openWarningModal } from '../../core/store/reducers/Modal/ModalWarningTestSlice';
import { selectAllTests } from '../../core/store/reducers/testsSlice';
import s from './Quizes.module.scss';

export default function Quizes() {
  const allTests = useSelector(selectAllTests);
  const dispatch = useDispatch();
  const handleOpen = (link) => {
    dispatch(openWarningModal(link));
  };

  return (
    <div className={s.wrapper}>
      <h1 className={s.title}>тесты</h1>
      <div className={s.cards}>
        {allTests.map((card) => (
          <div key={card.id} className={s.card}>
            <div className={s.time}>~10 минут</div>
            <h3 className={s.titleTest}>
              {card.title} {card.subtitle && <span>{card.subtitle}</span>}
            </h3>

            <ul>
              {card.recommendations.map((rec, index) => (
                <li key={index}>{rec}</li>
              ))}
            </ul>
            <button className={s.link} onClick={() => handleOpen(card.link)}>
              Пройти тест
            </button>
            {/* <Link to={card.link} className={s.link}>
							Пройти тест
						</Link> */}
          </div>
        ))}
      </div>
    </div>
  );
}
