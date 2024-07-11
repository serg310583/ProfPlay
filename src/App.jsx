import { Loading3QuartersOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import s from './App.module.scss';
import './SCSS/index.scss';
import { ModalAward } from './components/ModalAward/ModalAward';
import { ModalWarningTest } from './components/ModalWarningTest/ModalWarningTest';
import { fetchGetAllAwardsOrg } from './core/store/reducers/AllAwardsOrg/thunk';
import { StateAuth, getCurrentUser } from './core/store/reducers/auth';
import { fetchAwardUser } from './core/store/reducers/awardsUser';
import { fetchQuizzesUser } from './core/store/reducers/testsUser';
import router from './route/Route';

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
      <RouterProvider router={router} />
      {isAwardModalVisible && <ModalAward />}
      {isWarningModalVisible && <ModalWarningTest />}
    </div>
  );
}
