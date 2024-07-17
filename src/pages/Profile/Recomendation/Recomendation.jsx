import { Consultation } from './Consultation/Consultation';
import { Professions } from './Professions/Professions';
import s from './Recomendation.module.scss';
import { Universities } from './Universitets/Universities';

export default function Recomendation() {
  return (
    <div className={s.wrapperRecomedation}>
      <h3 className={s.title}>Рекмендуемые профессии</h3>
      <Professions />
      <h3 className={s.title}>Рекмендуемые консультации</h3>
      <Consultation />
      <h3 className={s.title}>Рекмендуемые учебные заведения</h3>
      <Universities />
    </div>
  );
}
