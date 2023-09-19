import postCover from '../../assets/computer.jpg';
import avatar from '../../assets/avatar.jpg';
import Tag from '../UI/Tag';

const HomeItem = props =>{
   return <div className="mx-auto py-8 w-auto">
            <img src={postCover} alt="cover"/>
            <div className="flex items-center mt-2">
                <div className="text-left">
                    <h3 className="text-2xl font-semibold">What is Micro Frontend?</h3>
                    <p className="text-m text-gray-600">You may have heard from your backend team that </p>
                    <div className="flex items-center my-4">
                        <div className="w-[32px] h-[32px] rounded-full border border-gray-200 overflow-hidden">
                            <img src={avatar} alt="avatar"/>
                        </div>
                        <p className="text-violet-600 ml-2 text-sm">Jonas Kakaroto</p>
                        <p className="text-sm text-gray-400 ml-3 text-sm">Jan.10.2023</p>
                    </div>
                </div>
            </div>
            <div className="flex items-center text-sm">
                <Tag name={'frontend'} classes={'mr-2'}></Tag>
                <Tag name={'frontend'} classes={'mr-2'}></Tag>
                <Tag name={'frontend'} classes={'mr-2'}></Tag>
                <Tag name={'frontend'} classes={'mr-2'}></Tag>
            </div>
        </div>
}

export default HomeItem;