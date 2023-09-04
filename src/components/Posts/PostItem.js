import { Fragment } from "react";
import postCover from '../../assets/dog-study.jpg';

const PostItem = props =>{
   return <div className="w-[720px] mx-auto py-8">
            <div className="flex items-center">
                <div className="text-left">
                    <h1 className="text-2xl">What is Micro Frontend?</h1>
                    <p>You may have heard from your backend team that they are using a microservices approach for building the backend. But what if we can use the same approach in building our frontend?</p>
                    <p>2023-09-03</p>
                </div>
                <img src={postCover} alt="cover"/>
            </div>
            <div className="flex items-center">
            <button className="bg-sky-50 text-gray-500 rounded-full py-1 px-3">frontend</button>
            <button className="bg-sky-50 text-gray-500 rounded-full py-1 px-3">frontend</button>
            <button className="bg-sky-50 text-gray-500 rounded-full py-1 px-3">frontend</button>
            </div>
        </div>
}

export default PostItem;