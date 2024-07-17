import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Close } from '../../components/UIcomponents/Close';
import s from './AwardsPage.module.scss';

export function AwardsPage({ setIsActive }) {
  const isAwardLoading = useSelector((state) => state.awards.isLoading);
  const isAwardSuccess = useSelector((state) => state.awards.isSuccess);
  const awardData = useSelector((state) => state.awards.data);

  const filteredAwardData = awardData.filter(
    (item) => item.data.achievement.data.tag === 'Achievement tag'
  );

  const isAllAwardsLoading = useSelector(
    (state) => state.allAwardsOrg.isLoading
  );
  const isAllAwardsSuccess = useSelector(
    (state) => state.allAwardsOrg.isSuccess
  );
  const allAwardsData = useSelector((state) => state.allAwardsOrg.data);

  const filteredAllAwardsData = allAwardsData.filter(
    (item) => item.data.tag === 'Achievement tag'
  );

  const [totalRank, setTotalRank] = useState(0);
  useEffect(() => {
    const sumRank = awardData.reduce((total, award) => {
      return total + (award.data.achievement.data.rank || 0);
    }, 0);
    setTotalRank(sumRank);
  }, [awardData, isAwardSuccess]);

  const receivedAwardIds = new Set(
    filteredAwardData.map((award) => award.data.achievement.id)
  );

  const upcomingAwards = filteredAllAwardsData.filter(
    (award) => !receivedAwardIds.has(award.id)
  );

  if (isAwardLoading || isAllAwardsLoading) {
    return <div className={s.awards}>Загрузка...</div>;
  }

  if (!isAwardSuccess || !isAllAwardsSuccess) {
    return <div className={s.awards}>Ошибка загрузки</div>;
  }
  return (
    <div className={s.awardsPage}>
      <div className={s.buttonCloseContainer}>
        <div className={s.scoreContainer}>
          <span className={s.titleAwards}>Баллы</span>
          <span className={s.totalScore}>{totalRank}</span>
          <img src='/assets/icons/Ellipse.svg' alt='coins' className={s.coin} />
        </div>
        <Close onClick={() => setIsActive(false)} />
      </div>
      <div className={s.awards}>
        <div className={s.awardReceived}>
          <h4 className={s.titleAwards}>Полученные награды</h4>
          <ul className={s.list}>
            {filteredAwardData.map((award) => (
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
                  <img
                    src='/assets/icons/Ellipse2.svg'
                    alt='coins'
                    className={s.coinInCard}
                  />
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
          <span className={s.textShop}>
            Товары ещё в разработке, но ждать осталось недолго
          </span>
        </div>
      </div>
    </div>
  );
}
