export const getQuizUrl = (address) => {
  switch (address) {
    case 1:
      return `/polls/944c919d-3294-4048-b342-c8408667d9d3`;
    case 2:
      return `/polls/1b580385-8d6c-4532-b3bf-4ed105afa732`;
    case 3:
      return `/polls/56eaa6fd-0cd9-4d4e-8a58-15b33fdcd7a5`;
    default:
      return '';
  }
};
