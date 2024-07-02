import { NavLink } from 'react-router-dom';
import styles from './Tabs.module.scss';

export function Tabs() {
  return (
    <div className={styles.tabs}>
      <ul className={styles.list}>
        <li className={styles.tab}>
          <NavLink
            to='/profile/userTests'
            className={({ isActive }) =>
              isActive ? styles.item_active : styles.item
            }
          >
            Тесты
          </NavLink>
        </li>
        {/* <li className={styles.tab}>
					<NavLink
						to='/profile/consultation'
						className={({ isActive }) =>
							isActive ? styles.item_active : styles.item
						}
					>
						Консультации
					</NavLink>
				</li> */}
        <li className={styles.tab}>
          <NavLink
            to='/profile/recomendation'
            className={({ isActive }) =>
              isActive ? styles.item_active : styles.item
            }
          >
            Рекомендации
          </NavLink>
        </li>
        <li className={styles.tab}>
          <NavLink
            to='/profile/events'
            className={({ isActive }) =>
              isActive ? styles.item_active : styles.item
            }
          >
            События
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
