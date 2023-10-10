import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import Card from "../components/Card";
import useInput from "../hooks/useInput";

const RegisterPage = (props) => {
  const navigate = useNavigate();

  //Email validation
  const validateEmail = (value) => {
    if (value.trim() === '') {
      return { isValid: false, errorMessage: 'Email is required.' };
    }
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(value)) {
      return { isValid: false, errorMessage: 'Please enter a valid email.' };
    }
    return { isValid: true, errorMessage: '' };
  };

  //Password validation
  const validatePassword = (value) => {
    if (value.trim() === '') {
      return { isValid: false, errorMessage: 'Password is required.' };
    }
   
    if (value.length < 6) {
      return { isValid: false, errorMessage: 'Password should have a minimum length of 6 characters.' };
    }
    return { isValid: true, errorMessage: '' };
  };


  //Confirm Password validation
  const validateConfirmPassword = (value) => {
    if (value.trim() === '') {
      return { isValid: false, errorMessage: 'Confirm Password is required.' };
    }
   
    if (value !== password) {
      return { isValid: false, errorMessage: 'The password and confirmation password should be the same.' };
    }
    return { isValid: true, errorMessage: '' };
  };

  
  const {
    value: fullName,
    isValid: fullNameIsValid,
    hasError: fullNameInputHasError,
    valueChangeHandler: fullNameChangeHandler,
    inputBlurHandler: fullNameBlurHandler,
  } = useInput(value => value.trim() !== '');

  const {
    value: email,
    isValid: emailIsValid,
    errorMessage: emailErrorMessage,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput(validateEmail);

  const {
    value: password,
    isValid: passwordIsValid,
    errorMessage: passwordErrorMessage,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput(validatePassword);

  const {
    value: confirmPassword,
    isValid: confirmPasswordIsValid,
    errorMessage: confirmPasswordErrorMessage,
    hasError: confirmPasswordInputHasError,
    valueChangeHandler: confirmPasswordChangeHandler,
    inputBlurHandler: confirmPasswordBlurHandler,
  } = useInput(validateConfirmPassword);


  let formIsValid = false;

  if (fullNameIsValid && emailIsValid && passwordIsValid && confirmPasswordIsValid) {
    formIsValid = true;
  }


  const handleSubmit = (event) => {
    if (!formIsValid) return;

    event.preventDefault();

    const userData = {
      email,
      password,
      fullName
    };

    api
      .post("/auth/register", userData)
      .then((result) => {
        localStorage.setItem("user", JSON.stringify(result));
        navigate("/login");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fullNameInputClasses = fullNameInputHasError
    ? "border-red-300 focus:ring-red-500"
    : "border-slate-300 focus:ring-sky-500";

  const emailInputClasses = emailInputHasError
    ? "border-red-300 focus:ring-red-500"
    : "border-slate-300 focus:ring-sky-500";
  const passwordInputClasses = passwordInputHasError
    ? "border-red-300 focus:ring-red-500"
    : "border-slate-300 focus:ring-sky-500";

  const confirmPasswordInputClasses = confirmPasswordInputHasError
    ? "border-red-300 focus:ring-red-500"
    : "border-slate-300 focus:ring-sky-500";

  return (
    <Card>
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="mb-2">
          <label htmlFor="fullName" className="custom-font">Full Name</label>
          <input
            id="fullName"
            type="text"
            placeholder="Your FullName "
            value={fullName}
            onBlur={fullNameBlurHandler}
            onChange={fullNameChangeHandler}
            className={`mt-1 block w-full px-3 py-2 bg-white border 
                                rounded-md text-sm shadow-sm placeholder-slate-400
                                focus:outline-none focus:ring-1  ${fullNameInputClasses}`}
          />
          {fullNameInputHasError && (
            <p className="text-red-500 text-sm">Full name is required.</p>
          )}
        </div>
        <div className="mb-2">
          <label htmlFor="email" className="custom-font">Email</label>
          <input
            id="email"
            type="text"
            placeholder="Email Address"
            value={email}
            onBlur={emailBlurHandler}
            onChange={emailChangeHandler}
            className={`mt-1 block w-full px-3 py-2 bg-white border 
                                rounded-md text-sm shadow-sm placeholder-slate-400
                                focus:outline-none focus:ring-1  ${emailInputClasses}`}
          />
          {emailInputHasError && (
            <p className="text-red-500 text-sm">{emailErrorMessage}</p>
          )}
        </div>

        <div className="mb-2">
          <label htmlFor="password" className="custom-font">Password</label>
          <input
            id="password"
            type="text"
            placeholder="Password"
            value={password}
            onBlur={passwordBlurHandler}
            onChange={passwordChangeHandler}
            className={`mt-1 block w-full px-3 py-2 bg-white border 
                                rounded-md text-sm shadow-sm placeholder-slate-400
                                focus:outline-none focus:ring-1  ${passwordInputClasses}`}
          />
          {passwordInputHasError && (
            <p className="text-red-500 text-sm">{passwordErrorMessage}</p>
          )}
        </div>

        <div>
          <label htmlFor="confirmPassword" className="custom-font">Confirm Password</label>
          <input
            id="confirmPassword"
            type="text"
            placeholder="Confirm Password"
            value={confirmPassword}
            onBlur={confirmPasswordBlurHandler}
            onChange={confirmPasswordChangeHandler}
            className={`mt-1 block w-full px-3 py-2 bg-white border 
                                rounded-md text-sm shadow-sm placeholder-slate-400
                                focus:outline-none focus:ring-1  ${confirmPasswordInputClasses}`}
          />
          {confirmPasswordInputHasError && (
            <p className="text-red-500 text-sm">{confirmPasswordErrorMessage}</p>
          )}
        </div>
        <button className="mt-8 px-4 py-2 bg-violet-600 hover:bg-violet-700  duration-200 text-white w-full rounded cursor-pointer">
          Sign Up
        </button>
        <div className="flex text-sm py-4 justify-center">
          <p className="text-gray-400">Already have an account?</p>
          <Link to="/login">
            <button className="ml-2 duration-200 text-violet-600 cursor-pointer">
              Sign In
            </button>
          </Link>
        </div>
      </form>
    </Card>
  );
};

export default RegisterPage;
