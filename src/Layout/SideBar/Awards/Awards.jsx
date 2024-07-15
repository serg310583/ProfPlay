import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  AwardState,
  fetchAwardUser,
} from '../../../core/store/reducers/awardsUser';

import s from './Awards.module.scss';
export function Awards() {
  const dispatch = useDispatch();
  const { isLoading, isSuccess, data } = useSelector(AwardState);
  const [totalRank, setTotalRank] = useState(0);
  const filteredData = data.filter(
    (item) => item.data.tag === 'Achievement tag'
  );
  const userId = localStorage.getItem('user_id');

  useEffect(() => {
    if (userId) {
      dispatch(fetchAwardUser(userId));
    }
  }, [userId, dispatch]);

  useEffect(() => {
    // Вычисляем сумму всех значений rank
    const sumRank = data.reduce((total, award) => {
      return total + (award.data.achievement.data.rank || 0);
    }, 0);
    setTotalRank(sumRank);
  }, [data]);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (data.length === 0) {
    return (
      <div className={s.noAward}>
        <p>У вас еще нет наград</p>
      </div>
    );
  }
  // Создаем копию массива и сортируем её по дате создания в порядке убывания, затем ограничиваем первыми двумя элементами
  const sortedData = [...filteredData].sort(
    (a, b) => new Date(b.created_date) - new Date(a.created_date)
  );
  const limitedAwards = sortedData.slice(0, 2);
  if (isSuccess) {
    return (
      <div className={s.awards}>
        <hr className={s.divider} />
        <p className={s.text}>
          <span className={s.score}>{totalRank}</span> баллов
        </p>
        <p className={s.title}>Достижения:</p>
        <div className={s.award}>
          <ul className={s.list}>
            {limitedAwards.map((award) => (
              <li key={award.id} className={s.listItem}>
                <div className={s.imageContainer}>
                  <img
                    src={award.data.achievement.data.image}
                    alt='award'
                    className={s.awardImage}
                  />
                </div>
                <div className={s.awardDescription}>
                  {award.data.achievement.data.description}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
