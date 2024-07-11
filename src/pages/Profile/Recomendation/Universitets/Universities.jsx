import s from './Universities.module.scss';

export function Universities() {
  return (
    <div className={s.universitiesWrapper}>
      <div className={s.universitiesCard}>
        <img
          src='/assets/images/profile/vuz/mur.png'
          alt='university'
          className={s.imageCard}
        />
      </div>
      <div className={s.universitiesCard}>
        <img
          src='/assets/images/profile/vuz/muv.png'
          alt='university'
          className={s.imageCard}
        />
      </div>
      <div className={s.universitiesCard}>
        <img
          src='/assets/images/profile/vuz/sgua.png'
          alt='university'
          className={s.imageCard}
        />
      </div>
      <div className={s.universitiesCard}>
        <img
          src='/assets/images/profile/vuz/sf.png'
          alt='university'
          className={s.imageCard}
        />
      </div>
    </div>
  );
}
