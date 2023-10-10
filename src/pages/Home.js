import { Fragment } from 'react';
import HomeItem from '../components/HomeItem';
import BlogCover from '../assets/blog-cover.jpg';

const HomePage = props =>{

    return <Fragment>
        <div className="w-screen pb-8 border-gray-200">
            <div className="py-10 mx-auto flex justify-center items-center">
                <h1 className="text-3xl font-bold">BLOG DEV</h1>
            </div>
            <div className="h-[50vh] overflow-hidden relative">
                <img src={BlogCover} alt="cover" className="sm:w-full sm:h-auto sm:max-w-full  max-w-none w-auto h-full"/>
                <h1 className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-5xl text-white font-bold tracking-wide">
                    <em>Stay Wired,Stay Inspired.</em>
                </h1>
            </div>
        </div>
        <div className="lg:w-[1024px] md:w-full md:px-8 px-6 mx-auto mt-12">
            <h2 className="text-violet-600 text-3xl font-semibold">Latest Posts</h2>
            <div className="grid gap-8 grid-cols-1 grid-rows-6 lg:grid-cols-3 lg:grid-rows-2 sm:grid-cols-2 md:grid-rows-3">
                <HomeItem />
                <HomeItem />
                <HomeItem />
                <HomeItem />
                <HomeItem />
                <HomeItem />
            </div>
        </div>
       
    </Fragment>
}

export default HomePage;