import { Dialog } from '@headlessui/react';

import { Close } from '../../components/UIcomponents/Close';
import FormRegistration from './Form';
import s from './Register.module.scss';

export function Register({ open, onClose, onCancel, onSwitch }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      onCancel={onCancel}
      className={s.wrapper}
    >
      <Dialog.Panel className={s.modal}>
        <div className={s.buttons}>
          <Close onClick={onClose} />
        </div>
        <h1 className={s.title}>Регистрация в Prof Play</h1>
        <FormRegistration />
        <div className={s.linkContainer}>
          Уже зарегистрировались?
          <a onClick={onSwitch} className={s.link}>
            Войти
          </a>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
}
