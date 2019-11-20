# Проектирование REST API

*Node.js, MongoDB, Mongoose*

## Доступные API:



CREATE, UPDATE, DELETE - доступен пользователю `prof@univer.msk.ru` паролем `fessor` с правами `root`

Пользователь `prof@univer.msk.ru` - также не может удалять себя.

#
### CREATE: Регистрация нового пользователя

МЕТОД: `POST` 

[79.143.31.227:3001/users/register](http://79.143.31.227:3001/users/register)

*формат передаваемых данных:*
*данные необходимо ввести в  `body` в программе Postman*
```json
{
"login": "ego@yandex.ru",
"password": "selfish", 
"access": "noob" //  или "root" 
}
```
#
### READ: Чтение всех пользователей из базы

МЕТОД: `GET`

[79.143.31.227:3001/users](http://79.143.31.227:3001/users) 

### READ: Поиск одного пользователя из базы

МЕТОД: `GET`

`79.143.31.227:3001/:login` 

вместо `:login` вставить эмейл, например: ego@yandex.ru
#
### UPDATE: Изменение данных пользователя
МЕТОД: `PUT`

[79.143.31.227:3001/users/:login](http://79.143.31.227:3001/users/)

вместо `:login` вставить эмейл, например: ego@yandex.ru

*формат передаваемых данных:*
*данные необходимо ввести в  `body` в программе Postman. Доступно изменение пароля пользователя.*

```json
{
"login": "ego@yandex.ru",
"password": "selfish", 
"access": "noob" //  или "root" 
}
```
#
### DELETE: Удаление пользователя

МЕТОД: `DELETE`

[79.143.31.227:3001/users/:login](http://79.143.31.227:3001/users/)


вместо `:login` вставить эмейл, например: ego@yandex.ru
