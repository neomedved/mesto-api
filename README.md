# Mesto API
*v1.0.0*
## О проекте:
API сервиса [Mesto](https://github.com/neomedved/mesto-frontend), интерактивной страницы, куда можно добавлять фотографии, удалять их и ставить лайки.\
Стек: *Node.js, Express, Webpack, MongoDB*.\
**[URL](https://api.mesto.neomedved.site)**
### Развёртывание проекта:
* Установка зависмостей: `npm install`
* Запуск в dev-режиме: `npm run dev`
* Запуск в production-режиме: `npm run start`
### Работа с API:
* Регистрация: `POST /signup`
* Авторизация: `POST /signin`
* Получение списка всех пользователей: `GET /users`
* Получение информации о пользователе по id: `GET /users/:userId`
* Создание пользователя: `POST /users`
* Получение списка всех карточек: `GET /cards`
* Создание карточки: `POST /cards`
* Удаление карточки по id: `DELETE /cards/:cardId`
### To-Do List:
* Обновление профиля: `PATCH /users/me`
* Обновление аватара: `PATCH /users/me/avatar`
* Постановка лайка карточке: `PUT /cards/:cardId/likes`
* Снятие лайка с карточки: `DELETE /cards/:cardId/likes`
