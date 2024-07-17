import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import { closeAwardModal } from '../../core/store/reducers/Modal/ModalAwardsSlice';
import { Close } from '../UIcomponents/Close';
import styles from './ModalAward.module.scss';

export default function ModalAward() {
  const dispatch = useDispatch();
  const { isAwardModalVisible, awardInfo } = useSelector(
    (state) => state.awardModal
  );
  const handleClose = () => {
    dispatch(closeAwardModal());
    // отправляем событие закрытия
    window.dispatchEvent(new Event('awardModalClose'));
  };
  const handleCloseAndRedirect = () => {
    dispatch(closeAwardModal());
    window.dispatchEvent(new Event('awardModalClose'));
    //TODO: написать логику переключения на окно с наградами
  };
  if (!isAwardModalVisible) return null;

  return (
    <>
      <Dialog
        open={isAwardModalVisible}
        onClose={handleClose}
        className={styles.wrapperModal}
      >
        <DialogPanel className={styles.modal}>
          <div className={styles.buttonContainer}>
            <Close onClick={handleClose} />
          </div>
          <DialogTitle className={styles.nameAward}>
            {awardInfo?.data.title}
          </DialogTitle>

          <div className={styles.awardContainer}>
            <img src={awardInfo?.data.image} alt='award' />
            <img
              src={'/assets/icons/awards/Component1.png'}
              alt='ok'
              className={styles.okImage}
            />
          </div>
          <p className={styles.description}>{awardInfo?.data.description}</p>
          <p className={styles}>
            Получено{' '}
            <span className={styles.accent}>{awardInfo?.data.rank}</span> баллов
          </p>
          <button
            onClick={handleCloseAndRedirect}
            className={styles.buttonToShop}
          >
            В магазин баллов
          </button>
        </DialogPanel>
      </Dialog>
    </>
  );
}
