import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '../Layout/MainLayout/MainLayout';
import { UserInfo } from '../Layout/UserInfo/UserInfo';
import { News } from '../pages/News/News';
import { Consultation } from '../pages/Profile/Consultation/Consultation';
import { EventsUser } from '../pages/Profile/EventsUser/EventsUser';
import { Recomendation } from '../pages/Profile/Recomendation/Recomendation';
import { UserTests } from '../pages/Profile/UserTests/UserTests';
import { QuizResult } from '../pages/QuizResult/quizResult';
import { QuizView } from '../pages/QuizView/QuizView';
import { Quizes } from '../pages/Quizes/Quizes';
import ErrorPage from '../pages/error-page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <QuizView />,
      },
      {
        path: 'result',
        element: <QuizResult />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'tests',
        element: <Quizes />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'news',
        element: <News />,
        errorElement: <ErrorPage />,
      },
    ],
  },

  {
    path: '/profile',
    element: <UserInfo />, // Используем Layout компонент здесь
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'userTests',
        element: <UserTests />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'consultation',
        element: <Consultation />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'recomendation',
        element: <Recomendation />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'events',
        element: <EventsUser />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);
export default router;
