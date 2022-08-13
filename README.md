# Messanger

![GitHub](https://img.shields.io/github/license/VladyKoo/middle.messenger.praktikum.yandex)
![Netlify](https://img.shields.io/netlify/554ea957-1d9d-4508-b338-048d87b0ab24)
![Heroku](https://heroku-badge.herokuapp.com/?app=radiant-hamlet-19909)
![GitHub repo size](https://img.shields.io/github/repo-size/VladyKoo/middle.messenger.praktikum.yandex)

The Mesenger has been developed for **Yandex Praktikum** course. It is unpretentious mesenger with standard features:

- **Registration**
- **Authorization**
- **Chats**
- **Messaging**

Befor starting development, а UI disign was created on **Figma** https://www.figma.com/file/NO65Sa4RkMf1WoK7MZx6O4/yandex-messanger-public

Project was written using **Typescript**. **Mocha and Chai** were used for carrying out tests.
Also the project includes linters, **Eslint** for javascript and typescript and **Stylelint** for scss.

The entire project was wraped with **Docker**.

App was deployed on **<span style="color:#7B57A4">Heroku</span>** https://radiant-hamlet-19909.herokuapp.com and **<span style="color:#41A5BD">Netlify</span>** https://vladykoo-chat.netlify.app

# Settings

## Build Setup

```bash
# install dependencies
$ npm install

# start with hot reload at localhost:1234
$ npm run dev

# build project
$ npm run build

# launch express server for static files at localhost:3000
$ npm run start
```

## Tests, lints

```bash
# run tests
$ npm test

# run eslint
$ npm run lint

# run stylelint
$ npm run stylelint
```

## Docker

```bash
# build docker image
$ docker build -t messanger .

# run docker container
$ docker run -d -p 3000:3000 --name messanger
```

## Heroku deploy

```bash
# log in to container registry
$ heroku container:login

# create a heroku app
$ heroku create

# build the image and push to container registry
$ heroku container:push web

# release the image to your app
$ heroku container:release web

# open the app in your browser
$ heroku open
```
