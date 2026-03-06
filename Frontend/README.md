Области хранения данных

- базы данных на json-server
- BFF
- редакс стор

Сущности приложения:

- пользователь: БД (список пользователь), BFF (сессия текущая), стор (отображения в браузере)

- роль пользователя: БД (список ролей), BFF (сессия пользователя с ролью), стор (использование на клиенте)

- статья: БД (список статей), стор (отображение в браузере)

- комментарии: БД (список коментов), стор (отображение в браузере)

Таблицы БД:

- пользователи - users: id / login / password / registed_ad / role_id
- роли - roles: id / name
- Товар - products: id / title / image_url / contetnt
- отзывы - comments: id / author_id / products_id / content

Схема состояния на BFF:

- сессия текущего пользователя: login / password / role

Схема для редакс стора (на клиенте):

- user: id / login / roleId
- products: массив product: id / title / imageUrl / CommentsCount
- product: id / title / imageUrl / contetnt / comments: массив comment: id / author / content
- users: массив user: id / login / registeredAt / role
