export const delay = (ms) => {
  return new Promise((resolve,reject)=> {
    setTimeout(() => {
      resolve()
    }, ms);
  })
}
export function handler(e){
  e.stopPropagation();
  e.preventDefault();
}