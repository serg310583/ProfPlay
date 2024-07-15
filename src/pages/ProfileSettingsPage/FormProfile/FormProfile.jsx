import { unwrapResult } from '@reduxjs/toolkit';
import {
  Button,
  ConfigProvider,
  Form,
  Input,
  Select,
  Space,
  message,
} from 'antd';
import locale from 'antd/es/date-picker/locale/ru_RU.js';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectInfoUserData } from '../../../core/store/reducers/infoUser';
import {
  fetchGetInfoUser,
  fetchPatchInfoUser,
  fetchPostInfoUser,
} from '../../../core/store/reducers/profileUser';
import Avatars from '../Avatar/Avatar';

import { Calendar } from '../../../components/Calendar/Calendar.jsx';
import { addAchiv } from '../../../core/store/reducers/achiver.js';
import { fetchAwardUser } from '../../../core/store/reducers/awardsUser.js';
import ids from './../../../core/variables.js';
import s from './FormProfile.module.scss';

export function FormProfile() {
  const dateFormat = 'DD.MM.YYYY';
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const userData = useSelector(selectInfoUserData);
  const account_id =
    localStorage.getItem('user_id') || localStorage.getItem('userId');
  const projectId = ids.project_id;

  const [selectedAvatarId, setSelectedAvatarId] = useState(null);
  const handleAvatarSelect = (id) => {
    setSelectedAvatarId(id);
  };

  const handleFinish = async (values) => {
    const formattedValues = {
      profile_id: account_id,
      profile_type: 'anonymous',
      first_name: values.first_name,
      last_name: values.last_name,
      birth_date: values.birth_date
        ? values.birth_date.format('YYYY-MM-DD')
        : null,
      sex: values.sex,
      contact_phone: [
        {
          title: 'phone',
          value: values.phoneValue,
        },
      ],
      contact_email: [
        {
          title: 'email',
          value: values.contact_email,
        },
      ],
      photo_small: values.photo_small,
      account_id: account_id,
      project_id: projectId,
    };
    dispatch(
      addAchiv({
        user_id: account_id,
        achievement_id: selectedAvatarId,
      })
    );
    try {
      let resultAction;
      if (!userData.profile_id) {
        resultAction = await dispatch(fetchPostInfoUser(formattedValues));
      } else {
        resultAction = await dispatch(
          fetchPatchInfoUser({
            userId: account_id,
            values: formattedValues,
          })
        );
      }

      const originalPromiseResult = unwrapResult(resultAction);
      // Если запрос успешен, отправляем запрос на получение обновленных данных
      await dispatch(fetchGetInfoUser(account_id));
      dispatch(fetchAwardUser(account_id));
    } catch (err) {
      // Обработка ошибки
      console.error('Ошибка при отправке данных профиля:', err);
    }
  };

  const onFinishFailed = (errorInfo) => {
    message.error(
      'Форма не отправлена, проверьте заполнение и отправьте еще раз'
    );
  };

  //отображение уже существующих данных в полях формы
  useEffect(() => {
    if (userData) {
      form.setFieldsValue({
        photo_small: userData.photo_small,
        first_name: userData.first_name,
        last_name: userData.last_name,
        sex: userData.sex,
        birth_date: userData.birth_date
          ? moment(userData.birth_date, 'YYYY-MM-DD')
          : null,
        contact_email: userData.contact_email?.[0]?.value,
        phoneValue: userData.contact_phone?.[0]?.value,
      });
    }
  }, [form, userData]);

  return (
    <div className={s.profile}>
      <div className={s.title}>Профиль</div>
      <ConfigProvider
        locale={locale}
        theme={{
          components: {
            Select: {
              optionActiveBg: '#3c474c',
              selectorBg: '#3c474c',
              optionSelectedBg: '#3c474c',
              optionSelectedColor: '#ffffff',
            },
          },
          token: {
            colorBgContainer: '#3c474c',
            colorPrimaryHover: '#ffffff',
            controlHeight: 58,
            borderRadius: 0,
            fontSize: 18,
            motionDurationMid: 0.8,
          },
        }}
      >
        <Form
          form={form}
          layout='vertical'
          onFinishFailed={onFinishFailed}
          onFinish={handleFinish}
          className={s.form}
          initialValues={{
            first_name: userData.first_name,
            last_name: userData.last_name,
            photo_small: userData.photo_small,
            sex: userData.sex,
            birth_date: userData.birth_date
              ? moment(userData.birth_date, 'YYYY-MM-DD')
              : null,
            contact_email: userData.contact_email?.[0]?.value,
            phoneValue: userData.phoneValue,
          }}
        >
          <Avatars form={form} onAvatarSelect={handleAvatarSelect} />
          <Form.Item
            className={s.input}
            name='first_name'
            label='Ваше имя'
            rules={[
              { required: true, message: 'Пожалуйста, введите ваше имя!' },
            ]}
          >
            <Input placeholder='Имя' />
          </Form.Item>
          <Form.Item
            className={s.input}
            name='last_name'
            label='Ваша фамилия'
            rules={[
              { required: true, message: 'Пожалуйста, введите вашу фамилию!' },
            ]}
          >
            <Input placeholder='Фамилия' />
          </Form.Item>
          <Space direction='horizontal'>
            <Form.Item
              className={s.input}
              name='sex'
              label='Ваш пол'
              rules={[
                { required: true, message: 'Пожалуйста, выберите ваш пол!' },
              ]}
            >
              <Select
                className={s.customSelect}
                virtual={false}
                popupClassName={s.popUp}
                options={[
                  {
                    value: 'male',
                    label: 'Муж',
                  },
                  {
                    value: 'female',
                    label: 'Жен',
                  },
                ]}
              />
            </Form.Item>
            <Form.Item
              className={s.input}
              label='Дата рождения'
              name='birth_date'
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Calendar
                className={s.customDatePicker}
                dropdownClassName={s.dropdownClassName}
                onChange={(date) => form.setFieldsValue({ birth_date: date })}
              />
            </Form.Item>
          </Space>

          <Form.Item
            className={s.input}
            name='contact_email'
            label='E-mail'
            rules={[
              {
                type: 'email',
                message:
                  'Пожалуйста, введите правильный адрес электронной почты',
              },
            ]}
          >
            <Input placeholder='Email' />
          </Form.Item>

          <Form.Item
            className={s.input}
            name='phoneValue'
            label='Номер телефона'
            rules={[
              {
                required: true,
                message: 'Пожалуйста, введите ваш номер телефона',
              },
            ]}
          >
            <Input placeholder='Телефон' />
          </Form.Item>

          <Button type='primary' htmlType='submit' className={s.button}>
            Сохранить
          </Button>
        </Form>
      </ConfigProvider>
    </div>
  );
}
