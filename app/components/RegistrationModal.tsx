'use client';
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2 } from 'lucide-react';
import ReusableButton from './ReusableButton';
import ErrorAlert from './ErrorAlert';
import FormField from './form/FormField';
import SelectField from './form/SelectField';
import { useRegistrationForm } from '../hooks/useRegistrationForm';

interface RegistrationModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialSessionPreference: string;
}

const RegistrationModal: React.FC<RegistrationModalProps> = ({
    isOpen,
    onClose,
    initialSessionPreference,
}) => {
    const {
        formData,
        errors,
        isSubmitting,
        isFormValid,
        handleInputChange,
        handleFormSubmission,
        clearGeneralError,
    } = useRegistrationForm(initialSessionPreference, onClose);

    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-0 sm:p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 50, opacity: 0 }}
                    className="bg-white sm:rounded-2xl shadow-xl w-full h-full sm:h-auto sm:max-w-lg p-6 sm:p-8 relative overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                        <X size={24} />
                    </button>
                    
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold text-camber-text-primary">Complete Your Registration</h2>
                        <p className="text-camber-text-secondary">Join thousands learning cycle-synced bloating relief</p>
                    </div>

                    <form onSubmit={handleFormSubmission} noValidate className="space-y-4">
                        
                        <div className="mb-4">
                            <ErrorAlert message={errors.general} onClose={clearGeneralError} />
                        </div>

                        <FormField
                            id="firstName"
                            name="firstName"
                            label="First Name"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            error={errors.firstName}
                            required
                        />

                        <FormField
                            id="email"
                            name="email"
                            label="Email Address"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            error={errors.email}
                            required
                        />

                        <SelectField
                            id="sessionPreference"
                            name="sessionPreference"
                            label="Workshop Preference"
                            value={formData.sessionPreference}
                            onChange={handleInputChange}
                            error={errors.sessionPreference}
                            required
                        >
                            <option value="">Select your preferred session</option>
                            <option value="follicular">Follicular Phase Workshop</option>
                            <option value="ovulatory">Ovulatory Phase Workshop</option>
                            <option value="luteal">Luteal Phase Workshop</option>
                            <option value="menstrual">Menstrual Phase Workshop</option>
                            <option value="all">🔥 Register for All 4 Sessions (Recommended)</option>
                        </SelectField>

                        <SelectField
                            id="hearAboutUs"
                            name="hearAboutUs"
                            label="How did you hear about us?"
                            value={formData.hearAboutUs}
                            onChange={handleInputChange}
                            labelOptional="(Optional)"
                        >
                            <option value="">Please select...</option>
                            <option value="quiz">Bloating Quiz</option>
                            <option value="tracker">Cycle Tracker</option>
                            <option value="blog">Blog Article</option>
                            <option value="social">Social Media</option>
                            <option value="referral">Friend Referral</option>
                            <option value="search">Google Search</option>
                            <option value="other">Other</option>
                        </SelectField>

                        <div className="pt-2">
                            <label className="flex items-start">
                                <input type="checkbox" id="privacyConsent" name="privacyConsent" checked={formData.privacyConsent} onChange={handleInputChange} className="mt-1 h-4 w-4 text-camber-sage-primary border-gray-300 rounded focus:ring-camber-sage-primary" required />
                                <div className="ml-3 text-sm">
                                    <span className="text-camber-text-secondary">I agree to receive workshop-related emails and understand this is <strong>faceless</strong> (no camera required). <a href="/privacy-policy" target="_blank" className="underline hover:text-camber-sage-primary">Privacy Policy</a>.</span>
                                    {errors.privacyConsent && <p className="text-red-500 text-xs mt-1">{errors.privacyConsent}</p>}
                                </div>
                            </label>
                        </div>

                        <div className="pt-4">
                            <ReusableButton type="submit" disabled={!isFormValid || isSubmitting} className="w-full h-12 !py-3 flex items-center justify-center">
                                {isSubmitting ? (
                                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Registering...</>
                                ) : (
                                    'Complete Registration'
                                )}
                            </ReusableButton>
                        </div>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-xs text-camber-text-secondary/80">🔒 Your information is secure and will never be shared. You&apos;ll receive 2-3 workshop-related emails only.</p>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default RegistrationModal;