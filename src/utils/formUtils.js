import { object, string, ref } from 'yup';
import { messages } from "../constants/messages";

const passwordRegx = /^(?=.*\d)(?=.*[A-Z]).{8,}$/

export const isFormComplete = (formData) => {
    return Object.values(formData).every(value => !!value);
};

export const registerSchema = object().shape({
    name: string().required(),
    category: string().required(),
    password: string().required().matches(passwordRegx, messages.invalidPassword),
    confirmPassword: string().required().oneOf([ref('password'), null], messages.invalidConfirmPassword),
    email: string().email().required(),
});

export const loginSchema = object().shape({
    email: string().email().required(),
    password: string().required(),
});

export const resetPasswordSchema = object().shape({
    newPassword: string().required().matches(passwordRegx, messages.invalidPassword),
    confirmNewPassword: string().required().oneOf([ref('newPassword'), null], messages.invalidConfirmPassword),
});

export const forgotPasswordSchema = object().shape({
    email: string().email().required(),
});