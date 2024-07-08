import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../core/store/reducers/auth';
import { Login } from '../../pages/Login/Login';
import { Register } from '../../pages/Register/Register';
import { Awards } from './Awards/Awards';
import { ProfileInfo } from './ProfileInfo/ProfileInfo';
import s from './SideBar.module.scss';

export function SideBar({ toggleAwardsPage, toggleProfilePage }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenLog, setIsOpenLog] = useState(false);

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const openRegistrationModal = () => {
    setIsOpen(true);
    setIsOpenLog(false);
  };

  const openLoginModal = () => {
    setIsOpenLog(true);
    setIsOpen(false);
  };

  const closeModals = () => {
    setIsOpen(false);
    setIsOpenLog(false);
  };

  return (
    <aside className={s.sideBarLayout}>
      {auth.currentUser ? (
        <div className={s.wrapper_sideBar}>
          <ProfileInfo toggleProfilePage={toggleProfilePage} />
          <div className={s.buttons}>
            <button onClick={toggleProfilePage} className={s.profilesetting}>
              Настройка профиля
            </button>
            <Link
              to={'https://profplay.tilda.ws/'}
              onClick={() => dispatch(logout())}
              className={s.buttonExit}
            >
              Выйти
            </Link>
          </div>

          <Awards />
          <button onClick={toggleAwardsPage} className={s.buttonAwards}>
            Все награды
            <img src='/assets/icons/arrowRight.svg' alt='arrow' />
          </button>
          <button onClick={toggleAwardsPage} className={s.buttonAwardsMobile}>
            <img src='/assets/icons/mobileDots.png' alt='all award' />
          </button>
          <hr className={s.divider} />
        </div>
      ) : (
        <div className={s.wrapper_sideBar}>
          <div className={s.unregText}>
            <p>
              Чтобы не потерять результаты тестов и полученные награды,
              рекомендуем зарегистрироваться
            </p>
          </div>

          <Register
            visible={isOpen}
            open={isOpen}
            onClose={() => setIsOpen(false)}
            onCancel={closeModals}
            onSwitch={openLoginModal}
          />
          <Login
            visible={isOpenLog}
            open={isOpenLog}
            onClose={() => setIsOpenLog(false)}
            onCancel={closeModals}
            onSwitch={openRegistrationModal}
          />
          <button
            className={s.register}
            onClick={() => openRegistrationModal(true)}
          >
            Зарегистрироваться
          </button>

          <button className={s.logIn} onClick={() => openLoginModal(true)}>
            Войти
          </button>
          <Awards />
          <button onClick={toggleAwardsPage} className={s.buttonAwards}>
            Все награды
            <img src='/assets/icons/arrowRight.svg' alt='all award' />
          </button>
          <button onClick={toggleAwardsPage} className={s.buttonAwardsMobile}>
            <img src='/assets/icons/mobileDots.png' alt='all award' />
          </button>

          <hr className={s.divider} />
        </div>
      )}
    </aside>
  );
}
