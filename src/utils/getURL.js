import { idTests } from '../core/variables';
export const getQuizUrl = (address) => {
  switch (address) {
    case 1:
      return `/polls/${idTests[2].id}`;
    case 2:
      return `/polls/${idTests[1].id}`;
    case 3:
      return `/polls/${idTests[0].id}`;
    default:
      return '';
  }
};
