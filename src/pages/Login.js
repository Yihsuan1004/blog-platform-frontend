import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import Card from "../components/UI/Card";

const LoginPage = (props) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);

  const emailIsValid = email.trim() !== "";
  const emailInputIsInValid = !emailIsValid && emailTouched;
  const passwordIsValid = password.trim() !== "";
  const passwordInputIsInValid = !passwordIsValid && passwordTouched;

  let formIsValid = false;

  if (emailIsValid && passwordIsValid) {
    formIsValid = true;
  }

  const handleEmailInputChange = (event) => {
    setEmailTouched(true);
    setEmail(event.target.value);
  };

  const handleEmailInputBlur = (event) => {
    setEmailTouched(true);
  };

  const handlePasswordInputChange = (event) => {
    setPassword(event.target.value);
    setPasswordTouched(true);
  };

  const handlePasswordInputBlur = (event) => {
    setPasswordTouched(true);
  };

  const handleSubmit = (event) => {
    if (!formIsValid) return;

    event.preventDefault();

    const userData = {
      email,
      password,
    };

    api
      .post("/auth/login", userData)
      .then((result) => {
        localStorage.setItem("user", JSON.stringify(result));
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const emailInputClasses = emailInputIsInValid
    ? "border-red-300 focus:ring-red-500"
    : "border-slate-300 focus:ring-sky-500";
  const passwordInputClasses = passwordInputIsInValid
    ? "border-red-300 focus:ring-red-500"
    : "border-slate-300 focus:ring-sky-500";

  return (
    <Card buttonName={"Login"}>
      <form className="w-full custom-font" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text"
            placeholder="請輸入Email"
            value={email}
            onBlur={handleEmailInputBlur}
            onChange={handleEmailInputChange}
            className={`mt-1 block w-full px-3 py-2 bg-white border 
                                    rounded-md text-sm shadow-sm placeholder-slate-400
                                    focus:outline-none focus:ring-1  ${emailInputClasses}`}
          />
          {!emailInputIsInValid || (
            <p className="text-red-500 text-sm">帳號為必填欄位</p>
          )}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="text"
            placeholder="請輸入密碼"
            value={password}
            onBlur={handlePasswordInputBlur}
            onChange={handlePasswordInputChange}
            className={`mt-1 block w-full px-3 py-2 bg-white border 
                                    rounded-md text-sm shadow-sm placeholder-slate-400
                                    focus:outline-none focus:ring-1  ${passwordInputClasses}`}
          />
          {!passwordInputIsInValid || (
            <p className="text-red-500 text-sm">密碼為必填欄位</p>
          )}
        </div>
        <button className="mt-8 px-4 py-2 bg-violet-600 hover:bg-violet-700  duration-200 text-white w-full rounded cursor-pointer custom-font">
          Login
        </button>
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
