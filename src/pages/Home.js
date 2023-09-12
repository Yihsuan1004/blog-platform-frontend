import { Fragment } from 'react';
import PostItem from '../components/Posts/PostItem';
import avatar from '../assets/bear-avatar.svg';
import { Link } from 'react-router-dom';

const HomePage = props =>{

    return <Fragment>
        <div className="w-screen py-16 border-b border-gray-200">
            <div className="w-[720px] mx-auto flex justify-between items-center">
                <img src={avatar} alt="logo"/>
                <p className="text-2xl text-left leading-10">HI，我是Yihsuan，現職是一名前端工程師，<br/>這個部落格紀錄了我在前端領域打滾的一些技術筆記</p>
            </div>
        </div>
        <Link to="/blog-post/1">
            <PostItem />
        </Link>
        <Link to="/blog-post/2">
            <PostItem />
        </Link>
        <Link to="/blog-post/3">
            <PostItem />
        </Link>
    </Fragment>
}

export default HomePage;