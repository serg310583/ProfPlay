import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { openAwardModal } from '../../core/store/reducers/Modal/ModalAwardsSlice';
import { addAchiv } from '../../core/store/reducers/achiver';
import {
  fetchGetAnswers,
  fetchPostAnswers,
  fetchPutAnswers,
} from '../../core/store/reducers/answers';
import { fetchGetQuiz } from '../../core/store/reducers/quiz';
import {
  decrementStep,
  incrementStep,
  resetStep,
  setStep,
} from '../../core/store/reducers/step';
import { fetchQuizzesUser } from '../../core/store/reducers/testsUser';
import { idAwards } from '../../core/variables';
import { generateSessionId } from '../../utils/generateUUID';
import { getQuizUrl } from '../../utils/getURL';
import { processAnswers } from '../../utils/processAnswer';
import { HolandRender } from './QuizHoland/HolandRender';
import { KlimovRender } from './QuizKlimov/KlimovRender';
import { OvcharovaRender } from './QuizOvcharova/OvcharovaRender';
import s from './QuizView.module.scss';

export function QuizView() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const isLoadingQuiz = useSelector((state) => state.quiz.isLoading);
  const quizData = useSelector((state) => state.quiz.data);
  const step = useSelector((state) => state.step.step);
  const answerData = useSelector((state) => state.answers.answer);
  const isLoadingAnswers = useSelector((state) => state.answers.isLoading);
  const isAwardModalVisible = useSelector(
    (state) => state.awardModal.isAwardModalVisible
  );
  const userTestsData = useSelector((state) => state.quizzes.data);
  const allTests = useSelector((state) => state.tests.allTests);
  const allAwardsOrg = useSelector((state) => state.allAwardsOrg.data);
  const awards = useSelector((state) => state.awards.data); // награды уже полученные

  const params = new URLSearchParams(location.search);
  const idAnswers = params.get('answerId');
  const address = parseInt(params.get('id'), 10) || 1;
  const [url, setUrl] = useState('');
  const [answers, setAnswers] = useState([]);
  const [testLength, setTestLength] = useState(0); //количество вопросов в тесте
  const [isOpen, setIsOpen] = useState(false); //состояние модального окна
  const [question, setQuestion] = useState([]); //состояние вопроса теста для извлечения из него значений (id, value, image)
  const [selectedAnswers, setSelectedAnswers] = useState([]); // объект со значениями выбранных ответов для их отображения
  const [sessionId, setSessionId] = useState('');
  const userId =
    localStorage.getItem('userId') || localStorage.getItem('user_id');

  const hasAward = awards.some(
    (award) => award.data.achievement.id === idAwards.firstStep
  ); //проверяем есть ли награда у пользователя

  const idAwardFirstStep = idAwards.firstStep;
  const idAwardAllTests = idAwards.allTests;

  const infoModalFirstStep = useMemo(() =>
    allAwardsOrg.find((award) => award.id === idAwardFirstStep, [allAwardsOrg])
  );
  const infoModalAllTests = useMemo(() =>
    allAwardsOrg.find((award) => award.id === idAwardAllTests, [allAwardsOrg])
  );

  const passedTests = userTestsData.filter((test) => test.is_passed === true);
  const passedTestIds = passedTests.map((test) => test.pollId);
  const uniquePassedTestIds = [...new Set(passedTestIds)];
  const totalTestsCount = allTests.length;
  const passedTestsCount = uniquePassedTestIds.length;
  const hasCompletedAllTests = passedTestsCount + 1 === totalTestsCount;

  useEffect(() => {
    if (answerData && answerData.answers) {
      setAnswers(answerData.answers);
    }
  }, [answerData]); // массив с ответами

  useEffect(() => {
    if (answerData && answerData.answers && answerData.answers.length > 0) {
      dispatch(setStep(answerData.answers.length));
    } else {
      dispatch(setStep(0));
    }
    return () => {
      dispatch(resetStep());
    };
  }, [answerData, dispatch]);

  let questionText = '';
  if (quizData && quizData.questions) {
    if (step < quizData.questions.length) {
      questionText = quizData.questions[step].text;
    } else if (step === quizData.questions.length) {
      questionText = quizData.questions[quizData.questions.length - 1].text;
    }
  }

  let questionImage = '';
  if (quizData && quizData.questions) {
    if (step < quizData.questions.length) {
      questionImage = quizData.questions[step].id;
    } else if (step === quizData.questions.length) {
      questionImage = quizData.questions[quizData.questions.length - 1].id;
    }
  }
  //замена id из URL на id теста
  useEffect(() => {
    setUrl(getQuizUrl(address));
  }, [address]);
  //-----UUID---------

  useEffect(() => {
    setSessionId(generateSessionId());
  }, []);

  //GET запрос теста
  useEffect(() => {
    if (url) {
      dispatch(fetchGetQuiz(url));
    }
  }, [url, dispatch]);
  //GET запрос ответов для допрохождения теста
  useEffect(() => {
    if (idAnswers) {
      dispatch(fetchGetAnswers(idAnswers));
    }
  }, [idAnswers, dispatch]);

  const sendFullDataToServer = async () => {
    try {
      const id = answerData.id || params.get('answerId');
      const pollId = quizData.id;
      const templateId = quizData.templateId;
      const assessorId = 'any string';
      const externalId = 'any string';
      const is_passed = true;
      const requestData = {
        pollId,
        templateId,
        userId,
        assessorId,
        externalId,
        answers,
        is_passed,
      };

      const redirectToResultsPage = (responseId) => {
        navigate(`/result?id=${responseId}`);
      };
      let response;

      if (answerData.is_passed === false) {
        response = await dispatch(
          fetchPutAnswers({ id, answerData: requestData })
        ).unwrap();
      } else {
        response = await dispatch(fetchPostAnswers(requestData)).unwrap();
      }
      const responseId = response.id;

      if (response && response.id) {
        if (!hasAward) {
          try {
            await dispatch(
              addAchiv({
                user_id: userId,
                achievement_id: idAwards.firstStep,
              })
            ).unwrap();
            dispatch(openAwardModal(infoModalFirstStep));
            // слушаем закрытие модального окна
            const modalCloseListener = () => {
              if (!isAwardModalVisible) {
                redirectToResultsPage(responseId);
                // удалить слушатель
                window.removeEventListener(
                  'awardModalClose',
                  modalCloseListener
                );
              }
            };
            window.addEventListener('awardModalClose', modalCloseListener);
          } catch (error) {
            console.error('Error adding achievement:', error);
          }
        } else if (hasCompletedAllTests) {
          try {
            await dispatch(
              addAchiv({
                user_id: userId,
                achievement_id: idAwards.allTests,
              })
            ).unwrap();
            dispatch(openAwardModal(infoModalAllTests));
            // слушаем закрытие модального окна
            const modalCloseListener = () => {
              if (!isAwardModalVisible) {
                redirectToResultsPage(responseId);
                // удалить слушатель
                window.removeEventListener(
                  'awardModalClose',
                  modalCloseListener
                );
              }
            };
            window.addEventListener('awardModalClose', modalCloseListener);
          } catch (error) {
            console.error('Error adding achievement:', error);
          }
        } else {
          redirectToResultsPage(responseId);
        }
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error uploading status:', error);
    }
  };

  //PUT запрос отправки не полных или повторных ответов на сервер
  const sendNotFullDataToServer = async () => {
    try {
      const pollId = quizData.id;
      const templateId = quizData.templateId;

      const assessorId = 'any string';
      const externalId = 'any string';
      const is_passed = false;
      const requestData = {
        pollId,
        templateId,
        userId,
        assessorId,
        externalId,
        answers,
        is_passed,
      };

      if (answerData) {
        const id = answerData.id;
        if (answerData.is_passed === false) {
          // Если доделывается тест (answerData есть и is_passed === false)
          dispatch(fetchPutAnswers({ id, answerData: requestData }));
        } else {
          // Если answerData есть, но is_passed !== false
          dispatch(fetchPostAnswers(requestData));
          dispatch(fetchQuizzesUser(userId));
        }
      } else {
        // Если это новый тест (answerData нет)
        dispatch(fetchPostAnswers(requestData));
        dispatch(fetchQuizzesUser(userId));
      }

      navigate('/profile/userTests'); // или на другую страницу кроме вывода результатов
    } catch (error) {
      console.error('Error uploading status:', error);
    }
  };
  useEffect(() => {
    if (quizData.questions && quizData.questions.length > 0) {
      setTestLength(quizData.questions.length); //получаем количество вопросов в тесте с проверкой на существование вопросов
      if (step >= 0 && step < quizData.questions.length) {
        setQuestion(quizData.questions[step].options); // получаем варианты ответов на вопрос с проверкой на текущий шаг
      }
    }
  }, [quizData, step]);

  const onClickVariant = (answerId, answerValue, answerImage) => {
    processAnswers(
      quizData,
      step,
      answerId,
      answerValue,
      answerImage,
      answers,
      setAnswers,
      setSelectedAnswers,
      selectedAnswers,
      sessionId
    );
    setTimeout(() => {
      if (step < testLength) {
        dispatch(incrementStep());
      }
    }, 300);
  };

  const onClickPrev = () => {
    answers.pop(); //удаляем из ответов последний ответ
    if (step !== 0) {
      dispatch(decrementStep());
    }
  };
  if (isLoadingQuiz) {
    return <div className={s.loaderWindow}>Загрузка теста...</div>; // Или индикатор загрузки
  }
  const quizHoland = 'quizHoland';
  const quizKlimov = 'quizKlimov';

  const renderContent = () => {
    if (address === 1) {
      return (
        <KlimovRender
          quizKlimov={quizKlimov}
          isOpen={isOpen}
          onClickPrev={onClickPrev}
          setIsOpen={setIsOpen}
          questionText={questionText}
          step={step}
          question={question}
          selectedAnswers={selectedAnswers}
          onClickVariant={onClickVariant}
          testLength={testLength}
          sendNotFullDataToServer={sendNotFullDataToServer}
          sendFullDataToServer={sendFullDataToServer}
        />
      );
    } else if (address === 2) {
      return (
        <OvcharovaRender
          isOpen={isOpen}
          onClickPrev={onClickPrev}
          setIsOpen={setIsOpen}
          questionText={questionText}
          step={step}
          questionImage={questionImage}
          question={question}
          selectedAnswers={selectedAnswers}
          onClickVariant={onClickVariant}
          testLength={testLength}
          sendNotFullDataToServer={sendNotFullDataToServer}
          sendFullDataToServer={sendFullDataToServer}
        />
      );
    } else if (address === 3) {
      return (
        <HolandRender
          quizHoland={quizHoland}
          isOpen={isOpen}
          onClickPrev={onClickPrev}
          setIsOpen={setIsOpen}
          questionText={questionText}
          step={step}
          question={question}
          selectedAnswers={selectedAnswers}
          onClickVariant={onClickVariant}
          testLength={testLength}
          sendNotFullDataToServer={sendNotFullDataToServer}
          sendFullDataToServer={sendFullDataToServer}
        />
      );
    }
    return null;
  };
  return <>{renderContent()}</>;
}
