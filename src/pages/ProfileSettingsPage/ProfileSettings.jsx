import { Close } from '../../components/UIcomponents/Close';
import { FormProfile } from './FormProfile/FormProfile';
import s from './ProfileSettings.module.scss';

export function ProfileSettings({ setIsActiveProfile }) {
  return (
    <div className={s.profileSettings}>
      <div className={s.buttonCloseContainer}>
        <Close onClick={() => setIsActiveProfile(false)} className={s.button} />
      </div>

      <FormProfile />
    </div>
  );
}