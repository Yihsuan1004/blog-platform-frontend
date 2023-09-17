import { Fragment } from "react";
import logoImage from '../../assets/logo.svg';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import avatar from '../../assets/avatar.jpg';
import { AiOutlinePlus } from "react-icons/ai";

const Header = props =>{
    const { isLoggedIn } = useAuth();

    console.log('isLoggedIn',isLoggedIn);

    return <Fragment>
        <header className="w-screen h-14 bg-black flex justify-between items-center px-8">
            <Link to="/">
                <div className="flex justify-between items-center">
                    <img className="h-[24px]" src={logoImage} alt="logo"/>
                    <h3 className="ml-4 text-white">BLOG DEV</h3>
                </div>
            </Link>
            <div className="text-gray-200">
                <button className="px-8 py-2 hover:text-white">Posts</button>
                <button className="px-8 py-2 hover:text-white">Tags</button>
                <button className="px-8 py-2 hover:text-white">Contact</button>
            </div>
            <div className="flex items-center">
                <Link to="/edit-post/new">
                    { !isLoggedIn ||
                    <button className="flex items-center bg-violet-600 px-4 py-1 text-gray-100 hover:text-white mr-4 rounded">
                        <AiOutlinePlus /> 
                        <p className="ml-2">New Post</p> 
                    </button>
                    }
                </Link>
                <div className="w-[32px] h-[32px] rounded-full overflow-hidden">
                    <img src={avatar} alt="avatar"/>
                </div>
                { isLoggedIn || <button className="text-gray-200 px-4 py-2 hover:text-white">Sign Up</button> }
            </div>
        </header>
    </Fragment>
}

export default Header;