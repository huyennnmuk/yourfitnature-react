'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    trackFieldValidationError,
    trackFormSubmit,
    trackSubmissionSuccess,
    trackSubmissionError,
    trackRedirectToConfirmation
} from '@/lib/analytics';

const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^@ ]+@[^@ ]+.[^@ ]+$/;
    return emailRegex.test(email) && email.length <= 100;
};

const validateFirstName = (name: string): boolean => {
    return name.trim().length >= 2 && name.trim().length <= 50 && /^[a-zA-Z\s'-]+$/.test(name.trim());
};

export const useRegistrationForm = (initialSession: string, onClose: () => void) => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        firstName: '',
        email: '',
        hearAboutUs: '',
        privacyConsent: false,
        sessionPreference: initialSession || 'all',
    });

    const [errors, setErrors] = useState({
        firstName: '',
        email: '',
        privacyConsent: '',
        sessionPreference: '',
        general: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const clearGeneralError = () => {
        setErrors(prev => ({ ...prev, general: '' }));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const inputValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

        setFormData(prev => ({ ...prev, [name]: inputValue }));

        let errorMessage = '';
        let hasError = false;
        if (name === 'firstName') {
            if (!validateFirstName(value)) {
                errorMessage = 'Please enter a valid first name (2-50 characters)';
                hasError = true;
            }
        } else if (name === 'email') {
            if (!validateEmail(value)) {
                errorMessage = 'Please enter a valid email address';
                hasError = true;
            }
        } else if (name === 'privacyConsent') {
            if (!inputValue) {
                errorMessage = 'Please agree to the privacy policy to continue';
                hasError = true;
            }
        } else if (name === 'sessionPreference') {
            if (!value) {
                errorMessage = 'Please select a workshop preference.';
                hasError = true;
            }
        }
        
        if (hasError) {
            trackFieldValidationError(name, errorMessage);
        }
        setErrors(prev => ({ ...prev, [name]: errorMessage, general: '' }));
    };

    const isFormValid = useMemo(() => {
        return validateFirstName(formData.firstName) &&
               validateEmail(formData.email) &&
               formData.privacyConsent &&
               formData.sessionPreference !== '';
    }, [formData]);

    useEffect(() => {
        if (isFormValid) {
            router.prefetch('/workshop-confirmation');
        }
    }, [isFormValid, router]);

    const handleFormSubmission = async (e: React.FormEvent) => {
        e.preventDefault();
        trackFormSubmit();
        
        const firstNameValid = validateFirstName(formData.firstName);
        const emailValid = validateEmail(formData.email);
        const consentValid = formData.privacyConsent;
        const sessionValid = formData.sessionPreference !== '';

        if (!firstNameValid || !emailValid || !consentValid || !sessionValid) {
            const validationErrors = {
                firstName: firstNameValid ? '' : 'Please enter a valid first name (2-50 characters)',
                email: emailValid ? '' : 'Please enter a valid email address',
                privacyConsent: consentValid ? '' : 'Please agree to the privacy policy to continue',
                sessionPreference: sessionValid ? '' : 'Please select a workshop preference.',
                general: '',
            };
            setErrors(validationErrors);
            trackSubmissionError({ message: `Client-side validation failed: ${JSON.stringify(validationErrors)}` });
            return;
        }

        setIsSubmitting(true);
        setErrors(prev => ({ ...prev, general: '' }));

        const submissionData = {
            ...formData,
            firstName: formData.firstName.trim(),
            email: formData.email.trim().toLowerCase(),
            registrationSource: 'landing_page',
            timestamp: new Date().toISOString(),
        };

        try {
            const response = await fetch('/api/workshop-registration', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(submissionData)
            });

            const result = await response.json();

            if (!response.ok) {
                const errorMsg = result.message || `HTTP error! status: ${response.status}`;
                trackSubmissionError({ message: errorMsg, status: response.status });
                throw new Error(errorMsg);
            }

            if (result.success) {
                trackSubmissionSuccess({ registration_id: result.data.id, session_type: result.data.sessionType });
                const params = new URLSearchParams({
                    session: result.data.sessionType,
                    email: encodeURIComponent(result.data.email),
                    registration_id: result.data.id,
                    token: result.data.confirmationToken,
                });
                trackRedirectToConfirmation({ registration_id: result.data.id, session_type: result.data.sessionType });
                router.push(`/workshop-confirmation?${params.toString()}`);
                onClose();
            } else {
                const serverErrors: any = { ...errors, general: result.message || 'An error occurred.' };
                if (result.errors && Array.isArray(result.errors)) {
                    result.errors.forEach((err: { field: string; message: string }) => {
                        serverErrors[err.field] = err.message;
                    });
                }
                setErrors(serverErrors);
                trackSubmissionError({ message: `${result.message} - ${JSON.stringify(result.errors)}` });
            }
        } catch (error: any) {
            setErrors(prev => ({ ...prev, general: error.message || 'Registration failed. Please check your connection and try again.' }));
            trackSubmissionError({ message: error.message });
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        formData,
        errors,
        isSubmitting,
        isFormValid,
        handleInputChange,
        handleFormSubmission,
        clearGeneralError,
    };
};
