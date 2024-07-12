import { LoadingOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, ConfigProvider, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { selectAllAwardsOrgData } from '../../core/store/reducers/AllAwardsOrg/slice.js';
import { openAwardModal } from '../../core/store/reducers/Modal/ModalAwardsSlice.js';
import { addAchiv } from '../../core/store/reducers/achiver';
import { register, selectAuthLoading } from '../../core/store/reducers/auth';
import { fetchAwardUser } from '../../core/store/reducers/awardsUser';
import { fetchGetProfileUser } from '../../core/store/reducers/profileUser.js';
import { fetchQuizzesUser } from '../../core/store/reducers/testsUser';
import ids, { idAwards } from './../../core/variables.js';
import s from './Form.module.scss';

const FormRegistration = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAuthLoading);
  const user_id = localStorage.getItem('userId');
  const user_type = 'login';
  const [form] = Form.useForm();
  const project_id = ids.project_id;
  const allAwardsOrg = useSelector(selectAllAwardsOrgData);
  const idAwardsRegistration = idAwards.hands;
  const infoModalRegistration = allAwardsOrg.find(
    (award) => award.id === idAwardsRegistration
  );
  const onFinish = async (values) => {
    // console.log('Received values of form: ', values)
    const { login, email, password } = values;
    const contact_phone = [
      {
        title: 'phone',
        value: `${values.phone}`,
      },
    ];

    dispatch(
      register({
        user_type,
        login,
        email,
        contact_phone,
        password,
        user_id,
        project_id,
      })
    )
      .unwrap()
      .then((action) => {
        // console.log('Login action payload:', action.payload)
        if (action.user_id) {
          const userId = action.user_id;
          localStorage.setItem('user_id', userId);
          // Добавление ачивки после регистрации.
          dispatch(
            addAchiv({
              user_id: userId,
              achievement_id: idAwards.hands,
            })
          );
          dispatch(openAwardModal(infoModalRegistration));
          dispatch(fetchAwardUser(userId));
          dispatch(fetchQuizzesUser(userId));
          dispatch(fetchGetProfileUser(userId));
          navigate('/profile/userTests');
        } else {
          console.error('Authentication failed');
        }
      })
      .catch((error) => {
        console.error('Error during authentication:', error);
      });
  };
  return (
    <ConfigProvider
      theme={{
        components: {
          Input: {
            colorPlaceholder: 'transparent',
            boxShadow: 'none',
            colorBgContainer: '#FFFFFF',
            colorBgContainerDisabled: '#FFFFFF',
            colorBgContainerHover: '#FFFFFF',
            colorBgContainerActive: '#FFFFFF',
            paddingBlock: 10,
          },
        },
      }}
    >
      <Form
        form={form}
        name='register'
        onFinish={onFinish}
        scrollToFirstError
        className={s.register_form}
      >
        <Form.Item
          name='login'
          className={s.item}
          tooltip='Как вы хотите, чтобы вас называли?'
          rules={[
            {
              required: true,
              message: 'Пожалуйста введите свой логин!',
            },
          ]}
        >
          <Input
            placeholder='Введите логин'
            prefix={<UserOutlined />}
            className={s.my_input}
          />
        </Form.Item>
        <Form.Item
          name='email'
          className={s.item}
          rules={[
            {
              type: 'email',
              message: 'Введите валидный E-mail!',
            },
            {
              required: true,
              message: 'Пожалуйста, введите ваш E-mail!',
            },
          ]}
        >
          <Input
            placeholder='Введите E-mail'
            prefix={<UserOutlined />}
            className={s.my_input}
          />
        </Form.Item>

        <Form.Item
          name='password'
          className={s.item}
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите ваш пароль!',
            },
          ]}
          hasFeedback
        >
          <Input.Password
            placeholder='Пароль'
            prefix={<UserOutlined />}
            className={s.my_input}
          />
        </Form.Item>

        <Form.Item
          name='confirm'
          className={s.item}
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Пожалуйста, подтвердите ваш пароль!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Пароли не совпадают!'));
              },
            }),
          ]}
        >
          <Input.Password
            placeholder='Подтверждение пароля'
            prefix={<UserOutlined />}
            className={s.my_input}
          />
        </Form.Item>
        <Form.Item
          name='agreement'
          valuePropName='checked'
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error('Нужно дать согласие')),
            },
          ]}
          className={s.checkBoxContainer}
        >
          <Checkbox className={s.checkbox}>
            <span className={s.textCheckbox}>
              Регистрируясь на сервисе я соглашаюсь с
            </span>
            <a href='' className={s.link}>
              {' '}
              политикой конфиденциальности
            </a>
          </Checkbox>
        </Form.Item>
        <Form.Item className={s.item}>
          <Button
            type='primary'
            htmlType='submit'
            className={s.my_button}
            disabled={isLoading}
          >
            {isLoading ? <LoadingOutlined spin /> : 'Зарегистрироваться'}
          </Button>
        </Form.Item>
      </Form>
    </ConfigProvider>
  );
};
export default FormRegistration;
