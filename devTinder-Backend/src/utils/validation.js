const validate = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Enter a valid name");
  } else if (!validate.isEmail(email)) {
    throw new Error("Enter a valid email");
  } else if (!validate.isStrongPassword(password)) {
    throw new Error("Enter a Strong password");
  }
};

const ValidateAllowedEdit = (req) => {
  const ALLOWED_UPDATES = [
    "firstName",
    "lastName",
    "photoURL",
    "about",
    "skills",
  ];
  const isAllowed = Object.keys(req.body).every((keys) =>
    ALLOWED_UPDATES.includes(keys),
  );
  return isAllowed;
};

const validateProfileEditData = (req) => {
  const { firstName, lastName, photoURL, about, skills } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Enter a valid Name");
  } else if (!validate.isURL(photoURL)) {
    throw new Error("Enter a valid Url");
  } else if (about.length < 10 || about.length > 300) {
    throw new Error("About section should be in 10-300 character only.");
  } else if (skills.length > 10) {
    throw new Error("Maximum 10 skills allowed");
  }
};

const validatePasswords = (req) => {
  const { oldPassword, newPassword } = req.body;
  if(!oldPassword || !newPassword){
    throw new Error("Old and New Password are required");
  }

  if(oldPassword === newPassword){
    throw new Error("Old and New Password Should be Unique");
  }
}

module.exports = {
  validateSignUpData,
  ValidateAllowedEdit,
  validateProfileEditData,
  validatePasswords
};
