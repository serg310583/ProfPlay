import { Outlet } from 'react-router-dom'
import { Header } from '../Header/Header'
import s from './MainLayout.module.scss'
export function MainLayout() {
	return (
		<div className={s.wrapper}>
			<Header />
			<main className={s.container}>
				<Outlet></Outlet>
			</main>
		</div>
	)
}
