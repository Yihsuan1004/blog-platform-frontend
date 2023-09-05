import { Fragment } from "react";
import logoImage from '../../assets/logo.svg';
import { Link } from 'react-router-dom';

const Header = props =>{
    return <Fragment>
        <header className="w-screen h-14 bg-sky-700 flex justify-between items-center px-8">
            <Link to="/">
                <div className="flex justify-between">
                    <img src={logoImage} alt="logo"/>
                    <h3 className="text-white ml-2 text-xl">YIHSUAN</h3>
                </div>
            </Link>
            <div className="text-gray-200">
            <Link to="/edit-post/new">
                <button className="px-4 py-2 hover:text-white">發布</button>
            </Link>
                <button className="px-4 py-2 hover:text-white">標籤</button>
                <button className="px-4 py-2 hover:text-white">關於我</button>
            </div>
        </header>
    </Fragment>
}

export default Header;