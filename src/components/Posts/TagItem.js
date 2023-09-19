import avatar from '../../assets/avatar.jpg';

const TagItem = props =>{
   return <div className="w-full mb-8">
            <h1 className="text-violet-600 text-2xl">Frontend</h1>
            <div className="ml-8">
                <div className="mt-5">
                    <h3 className="text-2xl mb-2">What is Micro Frontend?</h3>
                    <div className="flex items-center">
                        <div className="w-[32px] h-[32px] rounded-full border border-gray-200 overflow-hidden">
                            <img src={avatar} alt="avatar"/>
                        </div>
                        <p className="text-violet-600 ml-2 text-sm">Jonas Kakaroto</p>
                        <p className="text-sm text-gray-400 ml-3 text-sm">Jan.10.2023</p>
                    </div>
                </div>
                <div className="mt-5">
                    <h3 className="text-2xl mb-2">What is Micro Frontend?</h3>
                    <div className="flex items-center">
                        <div className="w-[32px] h-[32px] rounded-full border border-gray-200 overflow-hidden">
                            <img src={avatar} alt="avatar"/>
                        </div>
                        <p className="text-violet-600 ml-2 text-sm">Jonas Kakaroto</p>
                        <p className="text-sm text-gray-400 ml-3 text-sm">Jan.10.2023</p>
                    </div>
                </div>
                <div className="mt-5">
                    <h3 className="text-2xl mb-2">What is Micro Frontend?</h3>
                    <div className="flex items-center">
                        <div className="w-[32px] h-[32px] rounded-full border border-gray-200 overflow-hidden">
                            <img src={avatar} alt="avatar"/>
                        </div>
                        <p className="text-violet-600 ml-2 text-sm">Jonas Kakaroto</p>
                        <p className="text-sm text-gray-400 ml-3 text-sm">Jan.10.2023</p>
                    </div>
                </div>
            </div>
           
        </div>
}

export default TagItem;