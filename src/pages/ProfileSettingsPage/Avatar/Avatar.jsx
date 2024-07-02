import { Form } from 'antd';
import { useEffect, useState } from 'react';
import s from './Avatar.module.scss';
import { avatars } from './data';

const Avatars = ({ form }) => {
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  useEffect(() => {
    // Установка начального значения поля photo_small в форме
    const initialPhotoSmall = form.getFieldValue('photo_small');
    if (initialPhotoSmall) {
      setSelectedAvatar(initialPhotoSmall);
    }
  }, [form]);

  const handleAvatarChange = (avatar) => {
    setSelectedAvatar(avatar.file);
    form.setFieldsValue({ photo_small: avatar.file });
  };

  return (
    <Form.Item
      className={s.avatarBlock}
      name='photo_small'
      rules={[{ required: true, message: 'Пожалуйста, выберите аватар' }]}
    >
      <div className={s.avatarGrid}>
        {avatars.map((avatar, index) => (
          <div
            key={index}
            className={`${s.avatarWrapper} ${
              selectedAvatar === avatar.file ? s.selected : ''
            }`}
          >
            <label key={index} className={s.avatarOption}>
              <input
                type='radio'
                name='avatar'
                value={avatar.file} // Установка значения value
                checked={selectedAvatar === avatar.file}
                onChange={() => handleAvatarChange(avatar)}
                style={{ display: 'none' }}
              />
              <img
                src={avatar.file}
                alt={`Avatar ${index + 1}`}
                className={`${s.avatarImage} ${
                  selectedAvatar === avatar.file ? s.selected : ''
                }`}
              />
              <div
                className={`${s.avatarRank} ${
                  selectedAvatar === avatar.file ? s.selected : ''
                }`}
              >
                {avatar.rank === 0 ? 'Бесплатно' : `${avatar.rank} баллов`}
              </div>
            </label>
          </div>
        ))}
      </div>
    </Form.Item>
  );
};

export default Avatars;
