import { useEffect,useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PostItem from '../components/PostItem';
import api from '../api/api';


const Profile = (props) => {
    const [postList, setPostList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [author, setAuthor] = useState({});
    const { userId } = useParams();

    const currentUserId = JSON.parse(localStorage.getItem("user")).data.id;

    useEffect(() => {
        Promise.all([
            getUserInfo(),
            getUserPosts()
          ])
          .then(([userInfo, userPosts]) => {
            setAuthor(userInfo);
            setPostList(userPosts);
          })
          .catch((error) => {
            alert('An error occurred:', error.message);
            console.error(error);
          })
          .finally(() => {
            setLoading(false);
          });
      },[])
  

    const getUserInfo = () =>{
        return api.get(`users/${userId}/profile`)
        .then((result) => {
            return result.data;
        })
    } ;

    const getUserPosts = () =>{
        return  api.get(`users/${userId}/posts`)
        .then((result) => {
            return result.data;
        })
    } ;

    if (loading) {
    return <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-4xl">
        Loading...
    </div>;
    }
    

    return <div className="w-[600px] mx-auto mt-20">
        <div className="flex items-center">
            { author.profileImage ? 
            <div className="w-[80px] h-[80px] rounded-full border border-gray-200 overflow-hidden">
                <img src={author.profileImage} alt="profile" /> 
            </div>: 
            <div className="w-[80px] h-[80px] rounded-full border bg-gray-400 text-white text-center text-3xl leading-[80px] overflow-hidden">
                {author.fullName[0]}
            </div>
            }
            <div className="ml-4">
                <p className="font-bold text-xl">{author.fullName}</p>
                <p>{author.bio}</p>
                <p className="text-sm text-gray-400">Join Date: <span className="ml-1">{author.joinDate}</span></p>
                {
                    currentUserId === userId &&
                    <Link to={`/profile/edit`}>
                        <button className="text-violet-600 cursor-pointer hover:text-violet-800">Edit Profile</button>
                    </Link>
                }
            </div>
        </div>
       
        <div className="py-8"> 
            { postList.map(post => <PostItem key={post._id} post={post} id={post._id}/>)}
        </div>

    </div>

};

export default Profile;
