import React, { Suspense, lazy, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import s from './App.module.scss';
import './SCSS/index.scss';
import LoaderQuiz from './components/UIcomponents/Loaders/LoaderQuiz';
import { fetchGetAllAwardsOrg } from './core/store/reducers/AllAwardsOrg/thunk';
import { StateAuth, getCurrentUser } from './core/store/reducers/auth';
import { fetchAwardUser } from './core/store/reducers/awardsUser';
import { fetchQuizzesUser } from './core/store/reducers/testsUser';
const MainLayout = lazy(() => import('./Layout/MainLayout/MainLayout'));
const UserInfo = lazy(() => import('./Layout/UserInfo/UserInfo'));
const QuizView = lazy(() => import('./pages/QuizView/QuizView'));
const QuizResult = lazy(() => import('./pages/QuizResult/quizResult'));
const Quizes = lazy(() => import('./pages/Quizes/Quizes'));
const UserTests = lazy(() => import('./pages/Profile/UserTests/UserTests'));
const Recomendation = lazy(() =>
  import('./pages/Profile/Recomendation/Recomendation')
);
const EventsUser = lazy(() => import('./pages/Profile/EventsUser/EventsUser'));

export function App() {
  const dispatch = useDispatch();
  const isLoadingUser = useSelector(StateAuth).isLoading;
  const [isAppLoading, setIsAppLoading] = useState(true);

  const userId =
    localStorage.getItem('userId') || localStorage.getItem('user_id');

  useEffect(() => {
    const loadData = async () => {
      dispatch(getCurrentUser());
      dispatch(fetchAwardUser(userId));
      dispatch(fetchGetAllAwardsOrg());
      dispatch(fetchQuizzesUser(userId));
      setIsAppLoading(false);
    };
    loadData();
  }, [dispatch, userId]);

  const isAwardModalVisible = useSelector(
    (state) => state.awardModal.isAwardModalVisible
  );
  const isWarningModalVisible = useSelector(
    (state) => state.warningModal.isWarningModalVisible
  );

  if (isLoadingUser || isAppLoading) {
    return (
      <div className={s.loaderWindow}>
        <LoaderQuiz />
      </div>
    );
  }

  return (
    <Suspense
      fallback={
        <div className={s.loaderWindow}>
          <LoaderQuiz />
        </div>
      }
    >
      <Routes>
        <Route exact path='/' element={<MainLayout />}>
          <Route exact path='' element={<QuizView />} />
          <Route exact path='result' element={<QuizResult />} />
          <Route exact path='tests' element={<Quizes />} />
        </Route>
        <Route exact path='/profile' element={<UserInfo />}>
          <Route exact path='userTests' element={<UserTests />} />
          <Route exact path='recomendation' element={<Recomendation />} />
          <Route exact path='events' element={<EventsUser />} />
        </Route>
        <Route element={isAwardModalVisible && <ModalAward />} />
        <Route element={isWarningModalVisible && <ModalWarningTest />} />
      </Routes>
    </Suspense>
  );
}
