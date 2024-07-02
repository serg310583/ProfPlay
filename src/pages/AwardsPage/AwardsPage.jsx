import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Close } from '../../components/UIcomponents/Close';
import { StateAllAwardsOrg } from '../../core/store/reducers/AllAwardsOrg/slice';
import { AwardState } from '../../core/store/reducers/awardsUser';
import s from './AwardsPage.module.scss';

export function AwardsPage({ setIsActive }) {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(fetchGetAllAwardsOrg());
  // }, [dispatch]);

  const {
    isLoading: isAwardLoading,
    isSuccess: isAwardSuccess,
    data: awardData,
  } = useSelector(AwardState);
  const {
    isLoading: isAllAwardsLoading,
    isSuccess: isAllAwardsSuccess,
    data: allAwardsData,
  } = useSelector(StateAllAwardsOrg);

  const [totalRank, setTotalRank] = useState(0);
  useEffect(() => {
    // Вычисляем сумму всех значений rank
    const sumRank = awardData.reduce((total, award) => {
      return total + (award.data.achievement.data.rank || 0);
    }, 0);
    setTotalRank(sumRank);
  }, [awardData, isAwardSuccess]);

  if (isAwardLoading && isAllAwardsLoading) {
    return <div>Загрузка...</div>;
  }

  if (isAwardSuccess && isAllAwardsSuccess) {
    const receivedAwardIds = new Set(
      awardData.map((award) => award.data.achievement.id)
    );
    const upcomingAwards = allAwardsData.filter(
      (award) => !receivedAwardIds.has(award.id)
    );
    return (
      <div className={s.AwardsPage}>
        <div className={s.buttonCloseContainer}>
          <div className={s.scoreContainer}>
            <span className={s.titleAwards}>Баллы</span>
            <span className={s.totalScore}>{totalRank}</span>
            <img src='/assets/icons/Ellipse.svg' alt='coins' />
          </div>
          <Close onClick={() => setIsActive(false)} />
        </div>
        <div className={s.awards}>
          <div className={s.awardReceived}>
            <h4 className={s.titleAwards}>Полученные награды</h4>
            <ul className={s.list}>
              {awardData.map((award) => (
                <li key={award.id} className={s.listItem}>
                  <div className={s.imageContainer}>
                    <img
                      src={award.data.achievement.data.image}
                      alt='award'
                      className={s.awardImage}
                    />
                  </div>
                  <span className={s.titleAward}>
                    {award.data.achievement.data.rank}
                    <img src='/assets/icons/Ellipse2.svg' alt='coins' />
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className={s.awardReceived}>
            <h4 className={s.titleAwards}>Предстоящие награды</h4>
            <ul className={s.list}>
              {upcomingAwards.map((award) => (
                <li key={award.id} className={s.listItem}>
                  <div className={s.imageContainer}>
                    <img
                      src={award.data.image}
                      alt='award'
                      className={s.awardImage}
                    />
                  </div>
                  <span className={s.titleAward}>
                    {award.data.rank}
                    <img src='/assets/icons/Ellipse2.svg' alt='coins' />
                  </span>
                </li>
              ))}
            </ul>
            <hr />
          </div>
          <div className={s.shop}>
            <h4 className={s.titleAwards}>Магазин баллов</h4>
            <span>Товары ещё в разработке, но ждать осталось недолго</span>
          </div>
        </div>
      </div>
    );
  }
}
