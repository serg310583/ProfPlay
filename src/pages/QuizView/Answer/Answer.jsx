import { useSelector } from 'react-redux';
import { selectQuizData } from '../../../core/store/reducers/quiz';
import { selectStep } from '../../../core/store/reducers/step';
import { PreloadImages } from './../../../utils/preloadImages';
import styles from './Answer.module.scss';
export function Answer({
  onClickVariant,
  question,
  selectedAnswers,
  quizKlimov,
  quizHoland,
}) {
  const folderQuiz = quizKlimov ?? quizHoland;
  const selectedAnswersValues = Object.values(selectedAnswers); // для отображения выбранных ответов извлекаем значения из объекта для сравнения с текущим.
  const quizData = useSelector(selectQuizData);
  const step = useSelector(selectStep);
  const nextQuestion =
    quizData && quizData.questions && step + 1 < quizData.questions.length
      ? quizData.questions[step + 1].options
      : [];

  const nextQuestionImages = nextQuestion
    ? nextQuestion
        .map((item) => [
          `/assets/images/${folderQuiz}/options/svg/${item.id}.svg`,
        ])
        .flat()
    : [];

  return (
    <div className={styles.answers}>
      {question.map((item) => (
        <button
          onClick={() => {
            onClickVariant(item.id, item.value);
          }}
          key={item.value}
          className={styles.wrapper}
          style={{
            borderColor: selectedAnswersValues.includes(item.id)
              ? '#3C474C'
              : '',
            backgroundColor: selectedAnswersValues.includes(item.id)
              ? '#ffffff'
              : '',
          }}
        >
          <picture className={styles.picture}>
            <img
              src={`/assets/images/${folderQuiz}/options/svg/${item.id}.svg`}
              alt='answer image'
              style={{
                filter: selectedAnswersValues.includes(item.id)
                  ? 'grayscale(0%)'
                  : '',
              }}
            />
          </picture>

          <div className={styles.explanation}>
            <p>{item.value}</p>
          </div>
        </button>
      ))}
      <PreloadImages images={nextQuestionImages} />
    </div>
  );
}
