import { useSelector } from 'react-redux';
import { selectQuizzesData } from '../../../../core/store/reducers/testsUser';
import s from './Professions.module.scss';

export function Professions() {
  const data = useSelector(selectQuizzesData);
  const passedTests = data.filter((test) => test.is_passed === true);
  const passedTestsWithProfessions = passedTests.filter(
    (test) =>
      (test.is_passed === true &&
        test.pollId === '56eaa6fd-0cd9-4d4e-8a58-15b33fdcd7a5') ||
      '944c919d-3294-4048-b342-c8408667d9d3'
  );
  console.log(passedTests);
  console.log(passedTestsWithProfessions);

  return <div className={s.profList}></div>;
}
