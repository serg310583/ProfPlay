export const processAnswers = (
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
) => {
  const userId =
    localStorage.getItem('userId') ||
    localStorage.getItem('user_id') ||
    sessionId;
  localStorage.setItem('userId', userId);

  const isAnswerAdded = answers.some(
    (answer) => answer.questionId === quizData.questions[step].id
  );
  if (!isAnswerAdded) {
    const newAnswer = {
      questionId: quizData.questions[step].id,
      text: quizData.questions[step].text,
      answer: [
        {
          id: answerId,
          value: answerValue,
          image: answerImage || null,
        },
      ],
    };
    setAnswers((prevAnswers) => [...prevAnswers, newAnswer]);
  } else {
    return;
  }
  const updatedSelectedAnswers = {
    ...selectedAnswers,
    [quizData.questions[step].id]: answerId,
  };
  setSelectedAnswers(updatedSelectedAnswers);
};
