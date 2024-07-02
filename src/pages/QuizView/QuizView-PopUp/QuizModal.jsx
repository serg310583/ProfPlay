import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import styles from './QuizModal.module.scss';

export function QuizModal({ open, onClose, sendNotFullDataToServer }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <div className={styles.bg}>
        <DialogPanel className={styles.popup}>
          <DialogTitle className={styles.popup__title}>
            Уверены что хотите покинуть страницу?
          </DialogTitle>
          <Description className={styles.popup__text}>
            Если прервёте тестирование,то ваши результаты сохранятся в личном
            кабинете.
          </Description>
          <div className={styles.popup__buttonsWrapper}>
            <button className={styles.popup__button_grey} onClick={onClose}>
              Вернуться к тесту
            </button>
            <button
              className={styles.popup__button}
              onClick={() => {
                sendNotFullDataToServer();
              }}
            >
              Покинуть страницу
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
