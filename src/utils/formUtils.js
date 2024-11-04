import { object, string, ref, array, file, maybe, } from 'yup';
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

export const businessSheetSchema = object().shape({
    shortBiography: string().max(400),
    businessDescription: string().max(400),
    personalInformation: string().max(200),
    goals: string().max(1000),
    accomplishments: string().max(1000),
    interests: string().max(1000),
    networks: string().max(1000),
    skills: string().max(1000),
    goldenEgg: array(string()).ofLength(3),
    goldenGoose: array(string()).ofLength(3),
    goldenFarmer: array(string()).ofLength(3),
    companyStrengths: string().max(1000),
    powerWords: array(string()).ofLength(6),
    itemsProducts: array(string()).ofLength(3),
    headerBackgroundImage: maybe(file()),
    profileImage: maybe(file()),
    referralSheetBackgroundImage: maybe(file()),
    colorPreference: string(),
    fontPreference: string(),
});