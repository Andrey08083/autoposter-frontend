export const validateEmail = (email) => {
  let error = '';

  if (!email) {
    error = 'Email is required';
  } else if (!/^[^@\s]+@[^@\s.]+\.[^@.\s]+$/.test(email)) {
    error = 'Email is invalid';
  }
  return error;
};

export const validateFullName = (fullName) => {
  let error = '';
  if (!fullName) {
    error = 'Full name is required';
  } else if (!/^[^\s][A-Za-z][ A-Za-z_]{5,30}$/.test(fullName)) {
    error = 'Full name should have from 5 to 30 characters';
  }
  return error;
};

export const validateUserName = (userName) => {
  let error = '';
  if (!userName) {
    error = 'Username is required';
  } else if (!/^[A-Za-z][A-Za-z0-9_]{5,15}$/.test(userName)) {
    error = 'Username should have from 5 to 15 characters';
  }
  return error;
};

export const validatePassword = (password, passwordToCompare = null) => {
  let error = '';
  if (!password) {
    error = 'Password is required';
  } else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{5,}$/.test(password)) {
    error = 'Password should have at least 5 characters, one letter, one capital letter, one number';
  } else if (passwordToCompare !== null && password !== passwordToCompare) {
    error = 'Passwords do not match';
  }
  return error;
};
