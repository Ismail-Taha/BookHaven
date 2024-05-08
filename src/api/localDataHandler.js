export const registerUser = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({ email, password });
    localStorage.setItem('users', JSON.stringify(users));
};

export const checkCredentials = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users.some(user => user.email === email && user.password === password);
};
