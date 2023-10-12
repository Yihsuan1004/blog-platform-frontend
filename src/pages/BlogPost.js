import { useEffect,useState } from 'react';
import api from '../api/api';
import Tag  from '../components/Tag'; 
import { useParams,useNavigate, Link } from 'react-router-dom';
import { AiOutlineEdit, AiOutlineDelete} from "react-icons/ai";

const BlogPost = props =>{
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { postId } = useParams();
    const navigate = useNavigate();

    const currentUserId = JSON.parse(localStorage.getItem("user")).data.id;

    useEffect(() => {
        api.get(`/posts/${postId}`)
        .then((result) => {
            setData(result.data);
        })
        .catch((error) => {
            alert('An error occurred:',error.message);
            console.error(error);
        })
        .finally(() => {
            setLoading(false);
        });
    },[])

    const handleDeletePost = () =>{
        api.delete(`/posts/${postId}`)
        .then((result) => {
            alert('Successfully deleted');
            navigate("/posts");
        })
        .catch((error) => {
            alert('An error occurred:',error.message);
            console.error(error);
        })
        .finally(() => {
            setLoading(false);
        });
    }
    
  if (loading) {
    return <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-4xl">
        Loading...
    </div>;
  }

    return <div className="w-[800px] mx-auto">
        <section className="max-h-80 overflow-hidden mt-10">
         <img className="w-full h-auto" src={data.coverImage}  alt='cover'/>
        </section>
        <h1 className="text-4xl font-bold  mt-8 mb-4">{data.title}</h1>
        <section className="flex items-center mb-4">
            { data.tags && data.tags.length > 0 && data.tags.map((tag,index) =>  <Tag name={tag} key={index} classes={'mr-2'}></Tag>)}
        </section>
        <section className="flex items-center justify-between">
            <div className="flex items-center mb-4">
                { data.author.coverImage ? 
                    <div className="w-[32px] h-[32px] rounded-full border border-gray-200 overflow-hidden">
                        <img src={data.author.coverImage} alt="avatar" /> 
                    </div>: 
                    <div className="w-[32px] h-[32px] rounded-full border bg-gray-400 text-white text-center leading-[32px] overflow-hidden">
                        {data.author.fullName[0]}
                    </div>
                }
                <div className="ml-4">
                    <p className="text-violet-600 text-sm">{data.author.fullName}</p>
                    <p className="text-gray-400 text-sm tracking-wider">{data.createdDate}</p> 
                </div>
            </div>
            {/* 當文章作者和當前使用者一樣時，才會顯示文章編輯和刪除的功能 */}
           { currentUserId ===  data.author._id &&
            <div className="flex items-center">
                <Link to={`/edit-post/${postId}`} state={data}>
                    <button 
                        className="text-m flex items-center px-2 py-1  hover:text-violet-700 duration-150 rounded text-violet-600 px-4">
                        <AiOutlineEdit/>
                        <span className="ml-1">Edit</span>
                    </button>
                </Link>
               
                <button onClick={handleDeletePost}
                    className="text-m flex items-center px-2 py-1  hover:text-gray-700 duration-150 rounded text-gray-500 px-4">
                    <AiOutlineDelete/>
                    <span className="ml-1">Delete</span>
                </button>
            </div> }
           
        </section>
       
        <hr className="border border-gray-100" />
        <div className="py-8 blog-content"> 
            {<div dangerouslySetInnerHTML={{ __html: data.content }} />}
        </div>

    </div>
}

export default BlogPost;