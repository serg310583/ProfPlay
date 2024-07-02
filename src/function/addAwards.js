export const addAward = (dispatch, idAward, awards) => {
  const userId =
    localStorage.getItem('userId') || localStorage.getItem('user_id');

  // Проверка наличия награды у пользователя
  const hasAward = awards.some((award) => award.data.id === idAward);
  if (!hasAward) {
    dispatch(
      addAchiv({
        user_id: userId,
        achievement_id: idAward,
      })
    )
      .unwrap()
      .catch((error) => {
        console.error('Error adding achievement:', error);
      });
  }
};
