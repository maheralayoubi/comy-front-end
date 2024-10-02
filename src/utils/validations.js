const invalidEmailMessage = "Invalid email address .";
const invalidPasswordMessage =
  "Password must be at least 8 characters long, contain a number and an uppercase letter .";
const invalidConfirmPasswordMessage = "Passwords do not match .";

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  const passwordRegex = /^(?=.*\d)(?=.*[A-Z]).{8,}$/;
  return passwordRegex.test(password);
};

export const validateRegisterInputs = (registerData) => {
  if (!validateEmail(registerData.email)) return invalidEmailMessage;

  if (!validatePassword(registerData.password)) return invalidPasswordMessage;

  if (registerData.password !== registerData.confirmPassword)
    return invalidConfirmPasswordMessage;

  return null;
};

export const validateResetPasswordInput = (resetPasswordData) => {
  if (!validatePassword(resetPasswordData.newPassword))
    return invalidPasswordMessage;

  if (resetPasswordData.newPassword !== resetPasswordData.confirmNewPassword)
    return invalidConfirmPasswordMessage;

  return null;
};
