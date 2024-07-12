import moment from 'moment';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../../core/store/reducers/auth';
import { fetchGetProfileUser } from '../../../core/store/reducers/profileUser';
import s from './ProfileInfo.module.scss';

export function ProfileInfo({ toggleProfilePage }) {
  const userId = localStorage.getItem('user_id');
  const dispatch = useDispatch();
  const data = useSelector((state) => state.profileUser.data);
  const isLoading = useSelector((state) => state.profileUser.isLoading);

  useEffect(() => {
    if (userId) {
      dispatch(fetchGetProfileUser(userId));
    }
  }, [userId, dispatch]);

  // Функция для вычисления возраста
  const calculateAge = (birthDate) => {
    if (!birthDate) return '-';
    const birth = moment(birthDate, 'LL');
    const age = moment().diff(birth, 'years');
    return age;
  };

  if (isLoading) {
    return <div>Загрузка...</div>;
  }
  const avatarSrc = data.photo_small || '/assets/images/profile/avatar.svg';
  const age = calculateAge(data.birth_date);

  return (
    <div className={s.wrapper_profileInfo}>
      <div className={s.avatarContainer}>
        <img src={avatarSrc} alt='avatar' className={s.avatar} />
      </div>
      <div className={s.profileInfoSetting}>
        <div className={s.mobileButton}>
          <Link
            to={'https://profplay.tilda.ws/'}
            onClick={() => dispatch(logout())}
            className={s.logOut}
          >
            <img src='/assets/icons/logout.png' alt='settings profile' />
          </Link>
          <button onClick={toggleProfilePage} className={s.settingsProfile}>
            <img
              src='/assets/icons/settingProfile.png'
              alt='settings profile'
            />
          </button>
        </div>
      </div>
      <div className={s.mobileUserInfo}>
        <p className={s.userinfo}>
          <span className={s.userName}>Имя: </span>
          {data.first_name || '-'}
        </p>
        <p className={s.userinfo}>
          <span className={s.birthDateTitle}>Возраст: </span> {age}
          <span className={s.birthDate}> лет</span>
        </p>
      </div>
    </div>
  );
}
