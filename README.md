# PROF-Play

[Описание проекта](https://git.infra.cloveri.com/cloveri.start/profplay/profplay/-/wikis/home)

## :fire: Особенности

- используется библиотека [React](https://ru.react.js.org/)
- используется библиотека [Redux](https://redux.js.org) для управления состоянием данных и пользовательским интерфейсом
- используется [Redux Thunk](https://github.com/reduxjs/redux-thunk) для асинхронных запросов

## :hammer_and_wrench: Установка

- установите [NodeJS](https://nodejs.org/en/)
- установите глобально:
  - [Yarn](https://yarnpkg.com/getting-started): `npm i -g yarn`
- скачайте архив со сборкой по адресу https://git.infra.cloveri.com/cloveri.start/profplay/main/-/tree/main

- распакуйте архив в папку на локальном диске
- перейдите в терминале в папку со сборкой
- введите `yarn install`
- чтобы начать работу, введите команду: `yarn dev` (режим разработки)
- чтобы собрать проект, введите команду `yarn build` (режим сборки)

Если вы всё сделали правильно, у вас должен открыться браузер с локальным сервером.

## :open_file_folder: Файловая структура

```
main
├── public
│   └── assets
│       ├── fonts
│       ├── images
│       └── icons
├── src
│   ├── Layout
│   ├── api
│   ├── components
│   ├── core
│   ├── function
│   ├── pages
│   ├── route
│   └── SCSS
├── App.jsx
├── main.jsx
├── .gitignore
├── .eslintrc.cjs
├── .giylab-ci.yml
├── .htaccess
├── index.html
├── vite.config.js
├── package.json
├── yarn.lock
└── README.md
```

- Корень папки:
  - `.eslintrc.cjs` — настройки ESLint
  - `.gitignore` – запрет на отслеживание файлов Git'ом
  - `index.html` — основной файл html - точка входа в приложение
  - `package.json` — список зависимостей
  - `vite.config.js` — файл конфигурации vite
  - `yarn.lock` — дерево всех зависимостей с версиями
- Папка `src` - используется во время разработки:
  - шрифты: `public/assets/fonts`
  - изображения: `public/assets/images`
  - иконки: `public/assets/icons`
  - основыне переиспользуемые компоненты : `src/components`
  - страницы приложения : `src/pages`
  - стили, переменные для стилей, миксины : `src/SCSS`
  - настройки маршрутизации : `src/router`
  - слайсы, запросы, хуки, константы : `src/core`
  - базовые URL для отправки запросов на сервер находится в файле axios.js : `src/api/`

### Сторонние библиотеки

- все сторонние библиотеки устанавливаются в папку `node_modules`
  - для их загрузки воспользуйтеcь командой `yarn add package_name` (например, `yarn add jquery`)

## :envelope: Контакты

По всем вопросам пишите в [Telegram Сергею](https://t.me/Sergey310583)
