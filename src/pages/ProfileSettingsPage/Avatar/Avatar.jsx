import { Form } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import s from './Avatar.module.scss';

const Avatars = ({ form, onAvatarSelect }) => {
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const awardData = useSelector((state) => state.awards.data);
  const allAwardOrg = useSelector((state) => state.allAwardsOrg.data);
  const avatars = allAwardOrg.filter((item) => item.data.tag === 'avatar');
  const [totalRank, setTotalRank] = useState(0);
  console.log(totalRank);
  console.log(selectedAvatar);
  useEffect(() => {
    // Вычисляем сумму всех значений rank
    const sumRank = awardData.reduce((total, award) => {
      return total + (award.data.achievement.data.rank || 0);
    }, 0);
    setTotalRank(sumRank);
  }, [awardData]);

  useEffect(() => {
    // Установка начального значения поля photo_small в форме
    const initialPhotoSmall = form.getFieldValue('photo_small');
    if (initialPhotoSmall) {
      setSelectedAvatar(initialPhotoSmall);
    }
  }, [form, avatars]);

  const handleAvatarChange = (avatar) => {
    setSelectedAvatar(avatar.data.image);
    form.setFieldsValue({ photo_small: avatar.data.image });
    // Передаем id выбранного аватара в родительский компонент
    onAvatarSelect(avatar.id);
  };

  return (
    <Form.Item
      className={s.avatarBlock}
      name='photo_small'
      rules={[{ required: true, message: 'Пожалуйста, выберите аватар' }]}
    >
      <div className={s.avatarGrid}>
        {avatars
          .sort((a, b) => {
            if (a.data.rank === 0) return -1; // "Бесплатно" идет первым
            if (b.data.rank === 0) return 1; // "Бесплатно" идет первым
            return a.data.rank - b.data.rank; // Сортировка по возрастанию отрицательных значений
          })
          .map((avatar, index) => (
            <div
              key={index}
              className={`${s.avatarWrapper} ${
                selectedAvatar === avatar.data.image ? s.selected : ''
              }`}
            >
              <label key={index} className={s.avatarOption}>
                <input
                  type='radio'
                  name='avatar'
                  value={avatar.data.image}
                  checked={selectedAvatar === avatar.data.image}
                  disabled={`${-avatar.data.rank}` > totalRank}
                  onChange={() => handleAvatarChange(avatar)}
                  style={{ display: 'none' }}
                />
                <img
                  src={avatar.data.image}
                  alt={`Avatar ${index + 1}`}
                  className={`${s.avatarImage} ${
                    `${-avatar.data.rank}` > totalRank ? s.notActive : ''
                  }`}
                />
                <div
                  className={`${s.avatarRank} ${
                    selectedAvatar === avatar.data.image ? s.selected : ''
                  }`}
                >
                  {avatar.data.rank === 0
                    ? 'Бесплатно'
                    : `${-avatar.data.rank} баллов`}
                </div>
              </label>
            </div>
          ))}
      </div>
    </Form.Item>
  );
};

export default Avatars;
