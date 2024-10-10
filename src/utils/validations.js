import {
  invalidEmailMsg,
  invalidPasswordMsg,
  invalidConfirmPasswordMsg,
} from "../constants/messages";

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  const passwordRegex = /^(?=.*\d)(?=.*[A-Z]).{8,}$/;
  return passwordRegex.test(password);
};

export const validateRegisterInputs = (registerData) => {
  if (!validateEmail(registerData.email)) return invalidEmailMsg;

  if (!validatePassword(registerData.password)) return invalidPasswordMsg;

  if (registerData.password !== registerData.confirmPassword)
    return invalidConfirmPasswordMsg;

  return null;
};

export const validateResetPasswordInput = (resetPasswordData) => {
  if (!validatePassword(resetPasswordData.newPassword))
    return invalidPasswordMsg;

  if (resetPasswordData.newPassword !== resetPasswordData.confirmNewPassword)
    return invalidConfirmPasswordMsg;

  return null;
};
