export const delay = (ms) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, ms);
  })
}
export function handlerStopEvent(e) {
  e.stopPropagation();
  e.preventDefault();
}
export const NOTIFICATIONS = {
  success: {
    valueNot: 'Успешный вход',
    typeNot: 'success'
  },
  error: {
    valueNot: 'Ошибка',
    typeNot: 'error'
  },
  successAddQuestion: {
    valueNot: 'Вопрос успешно добавлен',
    typeNot: 'success'
  },
  errorAddQuestion: {
    valueNot: 'Ошибка добавления вопроса',
    typeNot: 'error'
  },
  successfinishQuiz: {
    valueNot: 'Опрос успешно создан',
    typeNot: 'success'
  },
  errorFinishQuiz: {
    valueNot: 'Ошибка добавления опроса',
    typeNot: 'error'
  },
}
export const keyAuth = 'AIzaSyCUwRH5FVQMXegoYOWsYyJZj4FtaL88V3g'
export const RESPONCE_SERVER = {
  SUCCES_LOGIN: {
    value: 'Успешный вход',
    type: 'success'
  },
  ERROR_LOGIN: {
    value: 'Ошибка авторизации',
    type: 'error'
  },
  SUCCES_SINGUP: {
    value: 'Успешная регистрация',
    type: 'success'
  },
  ERROR_SINGUP: {
    value: 'Ошибка регистрации',
    type: 'error'
  }
}