import { Dialog, DialogPanel } from '@headlessui/react';
import { Close } from '../../components/UIcomponents/Close';
import FormLogin from './Form';
import s from './Login.module.scss';

export function Login({ open, onClose, onCancel, onSwitch }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      onCancel={onCancel}
      className={s.wrapper}
    >
      <DialogPanel className={s.modal}>
        <div className={s.buttons}>
          <Close onClick={onClose} />
        </div>
        <h1 className={s.title}>Вход в профиль ProfPlay</h1>
        <FormLogin />
        <div className={s.linkContainer}>
          У вас нет учетной записи?{' '}
          <a onClick={onSwitch} className={s.link}>
            Зарегистрироваться
          </a>
        </div>
      </DialogPanel>
    </Dialog>
  );
}
