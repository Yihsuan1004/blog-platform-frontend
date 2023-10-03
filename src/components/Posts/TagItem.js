import avatar from '../../assets/avatar.jpg';

const TagItem = ({posts,tag}) =>{
   return <div className="w-full mb-8">
            <h1 className="text-violet-600 text-2xl">{tag}</h1>
            <div className="ml-8">
                {
                    posts.map((post,index) => (
                    <div className="mt-5" key={index}>
                        <h3 className="text-2xl mb-2">{post.title}</h3>
                        <div className="flex items-center">
                            <div className="w-[32px] h-[32px] rounded-full border border-gray-200 overflow-hidden">
                                <img src={avatar} alt="avatar"/>
                            </div>
                            <p className="text-violet-600 ml-2 text-sm">Jonas Kakaroto</p>
                            <p className="text-sm text-gray-400 ml-3 text-sm">{post.createdDate}</p>
                        </div>
                    </div>
                    ))
                }
            </div>
           
        </div>
}

export default TagItem;