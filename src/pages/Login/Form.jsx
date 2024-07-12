import { LoadingOutlined, UserOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, selectAuthLoading } from '../../core/store/reducers/auth';
import { fetchAwardUser } from '../../core/store/reducers/awardsUser';
import { fetchGetProfileUser } from '../../core/store/reducers/profileUser';
import { fetchQuizzesUser } from '../../core/store/reducers/testsUser';
import s from './Form.module.scss';

const FormLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAuthLoading);

  const onFinish = (values) => {
    dispatch(login(values))
      .then((action) => {
        if (action.payload.user_id) {
          const userId = action.payload.user_id;
          localStorage.setItem('user_id', userId);
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
        name='normal_login'
        className={s.login_form}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          className={s.item}
          name='username'
          rules={[
            {
              required: true,
              message: 'Введите ваше имя пользователя!',
            },
          ]}
        >
          <Input
            className={s.my_input}
            prefix={<UserOutlined />}
            placeholder='Логин'
          />
        </Form.Item>
        <Form.Item
          className={s.item}
          name='password'
          rules={[
            {
              required: true,
              message: 'Введите пароль!',
            },
          ]}
        >
          <Input.Password
            className={s.my_input}
            prefix={<UserOutlined />}
            type='password'
            placeholder='Пароль'
          />
        </Form.Item>

        <Form.Item className={s.item}>
          <Button
            type='primary'
            htmlType='submit'
            className={s.my_button}
            disabled={isLoading}
          >
            {isLoading ? <LoadingOutlined spin /> : 'Войти'}
          </Button>
          <div className={s.linkContainer}>
            <a href='' className={s.link}>
              Забыли пароль?
            </a>
          </div>
        </Form.Item>
      </Form>
    </ConfigProvider>
  );
};
export default FormLogin;
