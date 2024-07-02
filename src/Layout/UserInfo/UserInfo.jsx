import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AwardsPage } from '../../pages/AwardsPage/AwardsPage';
import { ProfileSettings } from '../../pages/ProfileSettingsPage/ProfileSettings';
import { Header } from '../Header/Header';
import { SideBar } from '../SideBar/SideBar';
import { Tabs } from '../Tabs/Tabs';
import s from './UserInfo.module.scss';

export function UserInfo() {
  //кнопка "Все награды"
  const [isActive, setIsActive] = useState(false);
  const toggleAwardsPage = () => {
    setIsActive(!isActive);
    if (isActiveProfile) {
      setIsActiveProfile(false);
    }
  };
  //кнопка "Настройки профиля"
  const [isActiveProfile, setIsActiveProfile] = useState(false);
  const toggleProfilePage = () => {
    setIsActiveProfile(!isActiveProfile);
    if (isActive) {
      setIsActive(false);
    }
  };

  return (
    <section className={s.wrapper}>
      <Header />
      <div className={s.content}>
        <SideBar
          toggleAwardsPage={toggleAwardsPage}
          toggleProfilePage={toggleProfilePage}
        />
        <div className={s.profileMain}>
          <Tabs />
          <Outlet></Outlet>

          <div
            className={`${s.ProfileSettingsWindow} ${
              isActiveProfile ? s._active : ''
            }`}
          >
            <ProfileSettings setIsActiveProfile={setIsActiveProfile} />
          </div>
          <div className={`${s.awardsWindow} ${isActive ? s._active : ''}`}>
            <AwardsPage setIsActive={setIsActive} />
          </div>
        </div>
      </div>
    </section>
  );
}
