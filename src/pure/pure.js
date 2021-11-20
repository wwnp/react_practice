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