import postCover from '../../assets/computer.jpg';
import avatar from '../../assets/avatar.jpg';
import Tag from '../UI/Tag';

const PostItem = ({post}) =>{
   return (
     <div className="flex items-center justify-between w-full mb-8">
       <div>
         <div className="flex items-center mt-2">
           <div className="text-left pr-4">
             <h3 className="text-2xl font-semibold">{post.title}</h3>
             <p className="text-m text-gray-600">{post.content}</p>
             <div className="flex items-center my-4">
               <div className="w-[32px] h-[32px] rounded-full border border-gray-200 overflow-hidden">
                 <img src={avatar} alt="avatar" />
               </div>
               <p className="text-violet-600 ml-2 text-sm">Jonas Kakaroto</p>
               <p className="text-sm text-gray-400 ml-3 text-sm">Jan.10.2023</p>
             </div>
           </div>
         </div>
         <div className="flex items-center text-sm">
           {post.tags.map((tag,index) => (
            <Tag name={tag} key={index} classes={"mr-2"}></Tag>
           ))}
         </div>
       </div>
       <div className="w-[100px] h-[100px] min-w-[100px] overflow-hidden">
         <img className="h-[100px] max-w-none" src={postCover} alt="cover" />
       </div>
     </div>
   );
}

export default PostItem;