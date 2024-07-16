import { Loading3QuartersOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import s from './App.module.scss';
import { MainLayout } from './Layout/MainLayout/MainLayout';
import { UserInfo } from './Layout/UserInfo/UserInfo';
import './SCSS/index.scss';
import { ModalAward } from './components/ModalAward/ModalAward';
import { ModalWarningTest } from './components/ModalWarningTest/ModalWarningTest';
import { fetchGetAllAwardsOrg } from './core/store/reducers/AllAwardsOrg/thunk';
import { StateAuth, getCurrentUser } from './core/store/reducers/auth';
import { fetchAwardUser } from './core/store/reducers/awardsUser';
import { fetchQuizzesUser } from './core/store/reducers/testsUser';
import { EventsUser } from './pages/Profile/EventsUser/EventsUser';
import { Recomendation } from './pages/Profile/Recomendation/Recomendation';
import { UserTests } from './pages/Profile/UserTests/UserTests';
import { QuizResult } from './pages/QuizResult/quizResult';
import { QuizView } from './pages/QuizView/QuizView';
import { Quizes } from './pages/Quizes/Quizes';
export function App() {
  const dispatch = useDispatch();
  const isLoadingUser = useSelector(StateAuth).isLoading;

  const userId =
    localStorage.getItem('userId') || localStorage.getItem('user_id');
  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAwardUser(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    dispatch(fetchGetAllAwardsOrg());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchQuizzesUser(userId));
  }, [dispatch, userId]);

  const isAwardModalVisible = useSelector(
    (state) => state.awardModal.isAwardModalVisible
  );
  const isWarningModalVisible = useSelector(
    (state) => state.warningModal.isWarningModalVisible
  );

  if (isLoadingUser) {
    return (
      <div className={s.loaderWindow}>
        <Loading3QuartersOutlined />
      </div>
    );
  }
  return (
    <div>
      {isAwardModalVisible && <ModalAward />}
      {isWarningModalVisible && <ModalWarningTest />}
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
      </Routes>
    </div>
  );
}
