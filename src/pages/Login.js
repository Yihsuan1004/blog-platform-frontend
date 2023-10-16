import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import api from "../api/api";
import Card from "../components/Card";
import useInput from "../hooks/useInput";

const LoginPage = (props) => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();

  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (value) => {
    if (value.trim() === "") {
      return { isValid: false, errorMessage: "Email is required." };
    }
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(value)) {
      return { isValid: false, errorMessage: "Please enter a valid email." };
    }
    return { isValid: true, errorMessage: "" };
  };

  const validatePassword = (value) => {
    if (value.trim() === "") {
      return { isValid: false, errorMessage: "Password is required." };
    }
    return { isValid: true, errorMessage: "" };
  };

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
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput(validatePassword);

  let formIsValid = false;

  if (emailIsValid && passwordIsValid) {
    formIsValid = true;
  }

  const handleSubmit = (event) => {
    if (!formIsValid) return;

    event.preventDefault();

    const userData = {
      email,
      password,
    };

    setLoading(true);

    api
      .post("/auth/login", userData)
      .then((result) => {
        localStorage.setItem("user", JSON.stringify(result));
        setIsLoggedIn(true);
        navigate("/");
      })
      .catch((error) => {
        setErrorMsg("Login failed. Your email or password is incorrect.");
        console.error(error);
      })
      .finally(()=>{
        setLoading(false);
      });;
  };

  const emailInputClasses = emailInputHasError
    ? "border-red-300 focus:ring-red-500"
    : "border-slate-300 focus:ring-sky-500";
  const passwordInputClasses = passwordInputHasError
    ? "border-red-300 focus:ring-red-500"
    : "border-slate-300 focus:ring-sky-500";

  return (
    <Card>
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="custom-font">
            Email
          </label>
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
        <div>
          <label htmlFor="password" className="custom-font">
            Password
          </label>
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
            <p className="text-red-500 text-sm">Password is required</p>
          )}
        </div>
        <button className="mt-8 px-4 py-2 bg-violet-600 hover:bg-violet-700  duration-200 text-white w-full rounded cursor-pointer disabled:opacity-50" 
                disabled={loading}>
          {loading ? <span class="loader-sm"></span> : "Sign In"}
        </button>
        {errorMsg && <p className="text-red-500 text-sm mt-2">{errorMsg}</p>}
        <div className="flex justify-center text-sm py-4">
          <p className="text-gray-400">Don't have an account?</p>
          <Link to="/register">
            <button className="ml-2 duration-200 text-violet-600 cursor-pointer">
              Sign Up
            </button>
          </Link>
        </div>
      </form>
    </Card>
  );
};

export default LoginPage;
