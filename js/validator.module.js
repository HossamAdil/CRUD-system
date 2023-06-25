export let regexObject = {
    name:/^[A-Z]{1}[a-z]{8,20}$/,
    price:/^\d{3,8}(\.\d{2})?$/,
    category:/^[A-Z]{1}[a-z]{8,20}$/,
    description:/^[A-Z]{1}[a-z ]{8,150}$/,
}

export default class Validator{}
Validator.validateInput = function(input){
   return /^[A-Z]{1}[a-z]{8,20}$/.test(input.value)
}
Validator.valid = function(input){
    input.classList.replace("is-invalid","is-valid")
}
Validator.invalid = function(input){
    input.classList.replace("is-valid","is-invalid")
}