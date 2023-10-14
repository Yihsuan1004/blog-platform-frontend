import { useEffect,useState } from 'react';
import api from '../api/api';
import PostItem from '../components/PostItem';

const PostList = props =>{
    const [postList, setPostList] = useState([]);

    const [keyword, setKeyword] =  useState('');

    useEffect(() => {
        getPageData();
      },[])
  
    const getPageData = () =>{
        api.get('/posts?top=20')
        .then((result) => {
            setPostList(result.data);
        })
        .catch((error) => {
            alert('An error occurred:',error.message);
            console.error(error);
        });
    }

    const handleInputChange = (event) =>{
        const value = event.target.value;
        setKeyword(value);
    }


    const handleSearch = () =>{
        const url = `/posts?title=${keyword}`;
        api.get(url).then(response => {
            setPostList(response.data);
        }).catch((error) => {
            alert('An error occurred:',error.message);
            console.error(error);
        });      
    }

    return <div className="w-[600px] mx-auto">
        <h1 className=" mt-24 mb-4 text-4xl text-black custom-font text-center">Posts</h1>
    
        <div className="flex items-center mb-6">
            <input
                id="email"
                type="text"
                placeholder="Enter Title"
                value={keyword}
                onChange={handleInputChange}
                className={`block w-full px-3 py-2 bg-white border 
                rounded-md text-sm shadow-sm placeholder-slate-400
                                        focus:outline-none focus:ring-1`}
            />
            <button className="w-[120px] py-2 px-3 ml-4 text-white bg-violet-600  rounded-md disabled:opacity-30"
                    disabled={!keyword}
                    onClick={handleSearch}>
                Search
            </button>
        </div>
        <div className="w-full">
            <p className="text-gray-400 text-sm">
            result:
            <span className="ml-2 text-gray-500">{postList.length || 0}
            </span> entries
            </p>
        </div>
        <div className="py-8"> 
            { postList.map(post => <PostItem key={post._id} post={post} id={post._id} isShowAuthor={true}/>)}
        </div>

    </div>
}

export default PostList;