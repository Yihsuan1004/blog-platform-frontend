import TagItem from '../components/Posts/TagItem';

const TagsPage = props =>{

    return <div className="w-[600px] mx-auto">
        <h1 className=" mt-24 mb-4 text-4xl text-black custom-font text-center">Tags</h1>
    
        <div className="flex items-center mb-6">
            <input
                id="email"
                type="text"
                placeholder="Enter Tags Name"
                className={`block w-full px-3 py-2 bg-white border 
                rounded-md text-sm shadow-sm placeholder-slate-400
                                        focus:outline-none focus:ring-1`}
            />
            <button className="w-[120px] py-2 px-3 ml-4 text-white bg-violet-600  rounded-md">Search</button>
        </div>

        <div className="py-8"> 
            <TagItem />
            <TagItem />
            <TagItem />
        </div>

    </div>
}

export default TagsPage;