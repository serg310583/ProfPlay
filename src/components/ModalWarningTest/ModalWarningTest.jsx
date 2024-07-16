import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { closeWarningModal } from '../../core/store/reducers/Modal/ModalWarningTestSlice';
import { Close } from '../UIcomponents/Close';
import s from './ModalWarningTest.module.scss';

export function ModalWarningTest() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(closeWarningModal());
  };
  const { isWarningModalVisible, link } = useSelector(
    (state) => state.warningModal
  );
  const handleRedirectTest = () => {
    navigate(link);
    dispatch(closeWarningModal());
  };
  return (
    <div>
      <>
        <Dialog
          open={isWarningModalVisible}
          onClose={handleClose}
          className={s.wrapperModal}
        >
          <DialogPanel className={s.modal}>
            <div className={s.buttonContainer}>
              <Close onClick={handleClose} />
            </div>
            <DialogTitle className={s.title}>Начало теста</DialogTitle>
            <p className={s.description}>
              Вы собираетесь начать тест. Если вы ранее уже проходили или
              начинали этот тест, текущие результаты в личном кабинете будут
              перезаписаны.
            </p>{' '}
            <div className={s.buttonsContainer}>
              <button
                className={s.popup__button_grey}
                onClick={handleRedirectTest}
              >
                Начать тест
              </button>
              <button className={s.popup__button_white} onClick={handleClose}>
                Отмена
              </button>
            </div>
          </DialogPanel>
        </Dialog>
      </>
    </div>
  );
}
