import { useState, useCallback, useMemo } from 'react';

import { compression } from "../utils/imageCompression";

const useFormData = (initialValues, schema) => {
    const [formData, setFormData] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [isValidating, setIsValidating] = useState(false);

    const validateSchema = useMemo(() => {
        return schema ? schema.clone() : null;
    }, [schema]);

    const handleChange = useCallback(async (event, index) => {
        const { id, name, value, files } = event.target;
        const fieldName = id || name; // Use id if available, otherwise use name

        let newValue = value;
        let updateFunction = (prevData) => ({ ...prevData, [fieldName]: newValue });

        if (files && files.length > 0) {
            newValue = await compression(files[0]);
            updateFunction = (prevData) => ({ ...prevData, [fieldName]: newValue });
        } else if (index !== undefined) {
            newValue = [...formData[fieldName]];
            newValue[index] = value;
            updateFunction = (prevData) => ({ ...prevData, [fieldName]: newValue });
        }

        setFormData(updateFunction);
        setTouched(prevTouched => ({ ...prevTouched, [fieldName]: true }));

    }, [formData]);

    const handleBlur = useCallback((event) => {
        const { name } = event.target;
        setTouched(prevTouched => ({ ...prevTouched, [name]: true }));
    }, []);

    const validateField = useCallback(async (fieldName) => {
        if (!validateSchema) return;

        try {
            await validateSchema.validateAt(fieldName, formData);
            setErrors(prevErrors => ({ ...prevErrors, [fieldName]: '' }));
        } catch (error) {
            setErrors(prevErrors => ({ ...prevErrors, [fieldName]: error.message }));
        }
    }, [formData, validateSchema]);

    const validateForm = useCallback(async () => {
        if (!validateSchema) return;

        setIsValidating(true);
        try {
            await validateSchema.validate(formData, { abortEarly: false });
            setErrors({});
            return true
        } catch (errors) {
            const newErrors = {};
            errors.inner.forEach(error => {
                newErrors[error.path] = error.message;
            });
            setErrors(newErrors);
            return false
        } finally {
            setIsValidating(false);
        }
    }, [formData, validateSchema]);

    const resetForm = useCallback(() => {
        setFormData(initialValues);
        setErrors({});
        setTouched({});
    }, [initialValues]);

    const resetField = useCallback((fieldName) => {
        setFormData(prevData => ({
            ...prevData,
            [fieldName]: initialValues[fieldName]
        }));
        setErrors(prevErrors => ({
            ...prevErrors,
            [fieldName]: ''
        }));
        setTouched(prevTouched => ({
            ...prevTouched,
            [fieldName]: false
        }));
    }, [initialValues]);

    const submitForm = useCallback(async (onSubmit) => {
        const isValid = await validateForm();
        // if (Object.keys(errors).length === 0) {
        //     onSubmit(formData);
        // }
        if (isValid) {
            onSubmit(formData);
        }
    }, [formData, validateForm]);

    return {
        formData,
        errors,
        touched,
        isValidating,
        resetField,
        handleChange,
        handleBlur,
        validateField,
        validateForm,
        resetForm,
        submitForm
    };
};

export default useFormData;