export function createControlFramework(config, validation) {
  return {
    ...config,
    validation,
    valid: !validation,
    touched: false,
    value: '',
    shouldValidate: true
  }
}
export function validate(value, validation = null) {
  if (!validation) {
    return true
  }
  let isValid = true
  if (validation.required) {
    isValid = value.trim() !==''&&isValid
  }
  if (validation.minLength) {
    isValid = value.length >= validation.minLength &&isValid
  }


  return isValid
}