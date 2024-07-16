import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.scss';

export function Header() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  // console.log(auth.currentUser) // должен выводить id пользователя (в дальнейшем JWT токен)
  return (
    <div className={styles.header}>
      <Link to='https://profplay.tilda.ws/' className={styles.logo}>
        <img src='/assets/images/logo.svg' alt='logo' />
      </Link>
      <ul className={styles.list}>
        <li>
          <NavLink
            to='/tests'
            className={({ isActive }) =>
              isActive ? styles.item_active : styles.item
            }
          >
            Тесты
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/profile/userTests'
            className={({ isActive }) =>
              isActive ? styles.item_active : styles.item
            }
          >
            Профиль
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
