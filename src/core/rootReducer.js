import { combineReducers } from '@reduxjs/toolkit';
import allAwardsOrgSlice from './store/reducers/AllAwardsOrg/slice';
import awardModalSlice from './store/reducers/Modal/ModalAwardsSlice';
import warningModalSlice from './store/reducers/Modal/ModalWarningTestSlice';
import achiver from './store/reducers/achiver';
import answersSlice from './store/reducers/answers';
import auth from './store/reducers/auth';
import awardsSlice from './store/reducers/awardsUser';
import infoUserSlice from './store/reducers/infoUser';
import profileUser from './store/reducers/profileUser';
import quizSlice from './store/reducers/quiz';
import step from './store/reducers/step';
import testsSlice from './store/reducers/testsSlice';
import quizzesSlice from './store/reducers/testsUser';

const rootReducer = combineReducers({
  auth: auth,
  achiver: achiver,
  tests: testsSlice,
  awards: awardsSlice,
  quizzes: quizzesSlice,
  infoUser: infoUserSlice,
  profileUser: profileUser,
  quiz: quizSlice,
  step: step,
  answers: answersSlice,
  allAwardsOrg: allAwardsOrgSlice,
  awardModal: awardModalSlice,
  warningModal: warningModalSlice,
});

export default rootReducer;
// здесь слайсы (состояния)
