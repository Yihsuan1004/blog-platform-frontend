import { useState } from "react";

const LoginPage = props =>{


    const [email,setEmail] = useState('');
    const [emailTouched, setEmailTouched] = useState(false);

    const [password,setPassword] = useState('');
    const [passwordTouched, setPasswordTouched] = useState(false);

    const emailIsValid = email.trim() !== '';
    const emailInputIsInValid = !emailIsValid && emailTouched;
    const passwordIsValid = password.trim() !== '' ;
    const passwordInputIsInValid = !passwordIsValid && passwordTouched;

    let formIsValid = false;


    if(emailIsValid && passwordIsValid){
        formIsValid = true;
    }

    
     
    const handleEmailInputChange  = event =>{
        setEmailTouched(true);
        setEmail(event.target.value);
    }

    const handleEmailInputBlur  = event =>{
        setEmailTouched(true);
    }

    const handlePasswordInputChange  = event =>{
        setPassword(event.target.value);
        setPasswordTouched(true);
    }

    const handlePasswordInputBlur  = event =>{
        setPasswordTouched(true);
    }

    const handleSubmit = event =>{
        if(!formIsValid) return;

        event.preventDefault();

        const userData = {
            email,
            password
        }

        fetch(
            "http://localhost:5200/api/auth/login",
            {
              method: "POST",
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(userData)
            }
        )
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          console.error(error);
        });
    }

    const emailInputClasses = emailInputIsInValid ? 'border-red-300 focus:ring-red-500' : 'border-slate-300 focus:ring-sky-500'  ;
    const passwordInputClasses = passwordInputIsInValid ? 'border-red-300 focus:ring-red-500' : 'border-slate-300 focus:ring-sky-500';

    return <div className="w-screen h-screen bg-slate-300">
            <form className="w-[360px] mx-auto p-12 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-white rounded shadow-xl"
                  onSubmit={handleSubmit}>
                <h1 className="text-2xl mb-4 font-bold">後台登入</h1>
                <div className="mb-4">
                    <label htmlFor="email">帳號</label>
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
                    {!emailInputIsInValid || <p className="text-red-500 text-sm">帳號為必填欄位</p>}
                </div>
                <div>
                    <label htmlFor="password">密碼</label>
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
                    {!passwordInputIsInValid || <p className="text-red-500 text-sm">密碼為必填欄位</p>}
                </div>
                <button disabled={!formIsValid} className="mt-8 px-4 py-2 bg-sky-700 text-white w-full rounded disabled:opacity-50">登入</button>
            </form>
        </div>
}

export default LoginPage;