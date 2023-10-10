import avatar from '../assets/avatar.jpg';
import Tag from './Tag';
import { useEffect, useState } from 'react';

const PostItem = ({post}) =>{
  const { content, title, tags , coverImg , author ,createdDate} = post;

  const [summary, setSummary] =  useState('');

  const getSummary = () =>{
    const domParser = new DOMParser();
    const doc = domParser.parseFromString(content, 'text/html');
    const textContent = doc.body.textContent;
    setSummary(textContent);
  } 

  useEffect(()=>{
    getSummary();
  },[])

   return (
     <div className="flex items-center justify-between w-full mb-8">
       <div>
         <div className="flex items-center mt-2">
           <div className="text-left pr-4">
             <h3 className="text-2xl font-semibold">{title}</h3>
             <p className="text-m text-gray-600">{summary}</p>
             <div className="flex items-center my-4">
                 { author.coverImage ? 
                  <div className="w-[32px] h-[32px] rounded-full border border-gray-200 overflow-hidden">
                    <img src={author.coverImage} alt="avatar" /> 
                  </div>: 
                  <div className="w-[32px] h-[32px] rounded-full border bg-gray-400 text-white text-center leading-[32px] overflow-hidden">
                    {author.fullName[0]}
                  </div>}
               <p className="text-violet-600 ml-2 text-sm">{author.fullName}</p>
               <p className="text-sm text-gray-400 ml-3 text-sm">{createdDate}</p>
             </div>
           </div>
         </div>
         <div className="flex items-center text-sm">
           {tags.map((tag,index) => (
            <Tag name={tag} key={index} classes={"mr-2"} />
           ))}
         </div>
       </div>
       <div className="w-[100px] h-[100px] min-w-[100px] overflow-hidden">
        {
          coverImg && <img className="h-[100px] max-w-none" src={coverImg} alt="cover" />
        }
       </div>
     </div>
   );
}

export default PostItem;