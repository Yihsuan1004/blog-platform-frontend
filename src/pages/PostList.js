import { useEffect,useState } from 'react';
import api from '../api/api';
import PostItem from '../components/Posts/PostItem';

const PostList = props =>{
    const [data, setData] = useState({});

    useEffect(() => {
        api.get('/posts/64fdaf28e92f5eb09ba2df7b')
        .then((result) => {
            setData(result.data.content);
        })
        .catch((error) => {
            console.error(error);
        });
    },[])


    return <div className="w-[600px] mx-auto">
        <h1 className=" mt-24 mb-4 text-4xl text-black custom-font text-center">Posts</h1>
    
        <div className="flex items-center mb-6">
            <input
                id="email"
                type="text"
                placeholder="Enter Title"
                className={`block w-full px-3 py-2 bg-white border 
                rounded-md text-sm shadow-sm placeholder-slate-400
                                        focus:outline-none focus:ring-1`}
            />
            <button className="w-[120px] py-2 px-3 ml-4 text-white bg-violet-600  rounded-md">Search</button>
        </div>

        <div className="py-8"> 
            <PostItem/>
            <PostItem />
        </div>

    </div>
}

export default PostList;