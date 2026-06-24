const validate = require('validator');

const validateSignUpData = (req) => {
   const { firstName, lastName, email, password } = req.body;
   if(!firstName || !lastName){
    throw new Error("Enter a valid name");
   } else if(!validate.isEmail(email)){
    throw new Error("Enter a valid email");
   } else if(!validate.isStrongPassword(password)){
    throw new Error("Enter a Strong password");
   }
}

module.exports = {validateSignUpData};


