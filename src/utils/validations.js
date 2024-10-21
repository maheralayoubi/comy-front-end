import {
  messages,
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
  if (!validateEmail(registerData.email)) return messages.invalidEmail;

  if (!validatePassword(registerData.password)) return messages.invalidPassword;

  if (registerData.password !== registerData.confirmPassword)
    return messages.invalidConfirmPassword;

  return null;
};

export const validateResetPasswordInput = (resetPasswordData) => {
  if (!validatePassword(resetPasswordData.newPassword))
    return messages.invalidPassword;

  if (resetPasswordData.newPassword !== resetPasswordData.confirmNewPassword)
    return messages.invalidConfirmPassword;

  return null;
};
