// Form validation utilities

export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validatePassword = (password) => {
    const errors = [];
    
    if (password.length < 8) {
        errors.push('Password must be at least 8 characters long');
    }
    
    if (!/[a-z]/.test(password)) {
        errors.push('Password must contain at least one lowercase letter');
    }
    
    if (!/[A-Z]/.test(password)) {
        errors.push('Password must contain at least one uppercase letter');
    }
    
    if (!/[0-9]/.test(password)) {
        errors.push('Password must contain at least one number');
    }
    
    if (!/[^A-Za-z0-9]/.test(password)) {
        errors.push('Password must contain at least one special character');
    }
    
    return {
        isValid: errors.length === 0,
        errors
    };
};

export const validateName = (name) => {
    if (!name || name.trim().length < 2) {
        return {
            isValid: false,
            error: 'Name must be at least 2 characters long'
        };
    }
    
    if (!/^[a-zA-Z\s]+$/.test(name)) {
        return {
            isValid: false,
            error: 'Name can only contain letters and spaces'
        };
    }
    
    return { isValid: true, error: null };
};

export const validateForm = (formData, formType = 'login') => {
    const errors = {};
    
    // Email validation
    if (!formData.email) {
        errors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
        errors.email = 'Please enter a valid email address';
    }
    
    // Password validation
    if (!formData.password) {
        errors.password = 'Password is required';
    } else if (formType === 'signup') {
        const passwordValidation = validatePassword(formData.password);
        if (!passwordValidation.isValid) {
            errors.password = passwordValidation.errors[0]; // Show first error
        }
    }
    
    // Signup-specific validations
    if (formType === 'signup') {
        // First name validation
        if (!formData.firstName) {
            errors.firstName = 'First name is required';
        } else {
            const nameValidation = validateName(formData.firstName);
            if (!nameValidation.isValid) {
                errors.firstName = nameValidation.error;
            }
        }
        
        // Last name validation
        if (!formData.lastName) {
            errors.lastName = 'Last name is required';
        } else {
            const nameValidation = validateName(formData.lastName);
            if (!nameValidation.isValid) {
                errors.lastName = nameValidation.error;
            }
        }
        
        // Confirm password validation
        if (!formData.confirmPassword) {
            errors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }
    }
    
    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};