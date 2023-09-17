import { Fragment } from 'react';
import PostItem from '../components/Posts/PostItem';
import { Link } from 'react-router-dom';
import BlogCover from '../assets/blog-cover.jpg';

const HomePage = props =>{

    return <Fragment>
        <div className="w-screen pb-8 border-gray-200">
            <div className="py-10 mx-auto flex justify-center items-center">
                <h1 className="text-3xl font-bold">BLOG DEV</h1>
            </div>
            <div className="h-[50vh] overflow-hidden relative">
                <img src={BlogCover} alt="cover"/>
                <h1 className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-5xl text-white font-bold tracking-wide">
                    <em>Stay Wired,Stay Inspired.</em>
                </h1>
            </div>
        </div>
        <div className="w-[1024px] mx-auto mt-12">
            <h2 className="text-violet-600 text-3xl font-semibold">Latest Posts</h2>
            <div className="grid gap-8 grid-cols-3 grid-rows-2">
                <Link to="/blog-post/1">
                    <PostItem />
                </Link>
                <Link to="/blog-post/2">
                    <PostItem />
                </Link>
                <Link to="/blog-post/3">
                    <PostItem />
                </Link>
                <Link to="/blog-post/1">
                    <PostItem />
                </Link>
                <Link to="/blog-post/2">
                    <PostItem />
                </Link>
                <Link to="/blog-post/3">
                    <PostItem />
                </Link>
            </div>
        </div>
       
    </Fragment>
}

export default HomePage;