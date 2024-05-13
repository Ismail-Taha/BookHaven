export const validateEmail = (email) => {
    return email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
};

export const validatePassword = (password) => {
    const hasLength = password.length >= 8;
    const hasNumbers = /\d/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return hasLength && hasNumbers && hasUpper && hasSpecial;
};

export const validateUsername = (username) => {
    const isValidLength = username.length >= 3 && username.length <= 20;
    const hasValidChars = /^[a-zA-Z0-9_.]+$/.test(username);
    return isValidLength && hasValidChars;
};
