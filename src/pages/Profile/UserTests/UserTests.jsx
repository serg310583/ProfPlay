import classNames from 'classnames';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectAllTests } from '../../../core/store/reducers/testsSlice';
import {
  StateQuizzes,
  fetchQuizzesUser,
} from '../../../core/store/reducers/testsUser';
import s from './UserTests.module.scss';

export function UserTests() {
  const currentDomain = window.location.origin;
  const dispatch = useDispatch();
  const userId = localStorage.getItem('user_id');
  useEffect(() => {
    if (userId) {
      dispatch(fetchQuizzesUser(userId));
    }
  }, [userId, dispatch]);
  const allTests = useSelector(selectAllTests);

  const { data, isLoading, isSuccess } = useSelector(StateQuizzes);
  const specificTestIds = [
    '56eaa6fd-0cd9-4d4e-8a58-15b33fdcd7a5',
    '1b580385-8d6c-4532-b3bf-4ed105afa732',
    '944c919d-3294-4048-b342-c8408667d9d3',
  ];

  const passedTests = data.filter((test) => test.is_passed === true);
  const unPassedTests = data.filter((test) => test.is_passed !== true);

  // Функция для получения последних результатов по дате для каждого указанного теста
  const getLastResults = (tests) => {
    const filteredTests = tests.filter((test) =>
      specificTestIds.includes(test.pollId)
    );
    const latestTests = {};

    filteredTests.forEach((test) => {
      if (
        !latestTests[test.pollId] ||
        new Date(test.created_date) >
          new Date(latestTests[test.pollId].created_date)
      ) {
        latestTests[test.pollId] = test;
      }
    });

    return Object.values(latestTests);
  };

  const specificPassedTests = getLastResults(passedTests);
  const specificUnpassedTests = getLastResults(unPassedTests);

  const passedAndUnpassedIds = new Set(
    [...passedTests, ...unPassedTests].map((test) => test.pollId)
  );

  const recommendedTests = allTests.filter(
    (test) => !passedAndUnpassedIds.has(test.id)
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU');
  };

  const findTestDetails = (pollId) => {
    return allTests.find((test) => test.id === pollId);
  };

  if (isLoading) {
    return (
      <div className={s.wrapper}>
        <p className={s.titleCard}>Загрузка...</p>
      </div>
    );
  }
  const renderTest = (test) => {
    const testDetails = findTestDetails(test.pollId);
    return (
      <li
        key={test.answerId}
        className={classNames(s.listItem, {
          [s.passed]: test.is_passed,
          [s.unPassed]: !test.is_passed,
        })}
      >
        {testDetails && (
          <>
            <p className={s.title}>
              {testDetails.title} <br />
              {testDetails.subtitle && <span>{testDetails.subtitle}</span>}
            </p>
            <span className={s.dateCreate}>
              от {formatDate(test.created_date)}
            </span>
            <div className={s.img}>
              <img
                src={
                  test.is_passed
                    ? '/assets/images/profile/ok.svg'
                    : '/assets/images/profile/clock.svg'
                }
                alt='ok'
              />
            </div>
            <a
              href={
                test.is_passed
                  ? `${currentDomain}/result?id=${test.answerId}`
                  : `${currentDomain}${testDetails.link}&answerId=${test.answerId}`
              }
              className={s.link}
            >
              {test.is_passed ? 'Смотреть результаты' : 'Продолжить'}
            </a>
          </>
        )}
      </li>
    );
  };

  if (isSuccess) {
    return (
      <div className={s.wrapper_userTests}>
        <div className={s.titleCard}>Пройденные</div>
        <ul className={s.list}>{specificPassedTests.map(renderTest)}</ul>
        <div className={s.titleCard}>В процессе</div>
        <ul className={s.list}>{specificUnpassedTests.map(renderTest)}</ul>
        <div className={s.titleCard}>Рекомендуемые</div>
        <ul className={s.list}>
          {recommendedTests.map((card) => (
            <li key={card.id} className={s.listItemRecom}>
              <div className={s.time}>~10 минут</div>
              <p className={s.title}>
                {card.title} <br />
                {card.subtitle && <span>{card.subtitle}</span>}
              </p>
              <ul>
                {card.recommendations.map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>

              <Link className={s.link} to={`${card.link}`}>
                Пройти тест
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  return (
    <div className={s.wrapper_userTests}>
      <div className={s.titleCard}>Рекомендуемые</div>
      <ul className={s.list}>
        {recommendedTests.map((card) => (
          <li key={card.id} className={s.listItemRecom}>
            <div className={s.time}>~10 минут</div>
            <p className={s.title}>
              {card.title} <br />
              {card.subtitle && <span>{card.subtitle}</span>}
            </p>
            <ul>
              {card.recommendations.map((rec, index) => (
                <li key={index}>{rec}</li>
              ))}
            </ul>

            <Link className={s.link} to={`${card.link}`}>
              Пройти тест
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
