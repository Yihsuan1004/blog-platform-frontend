import TagItem from "../components/Posts/TagItem";
import api from "../api/api";
import { useState, useEffect } from "react";

const TagsPage = (props) => {
  const [tagList, setTagList] = useState([]);
  const [tag, setTag] = useState("");

  const handleSearch = () => {
    const url = `/posts/byTag?tag=${tag}`;
    api
      .get(url)
      .then((response) => {
        setTagList(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getDataByTag = () => {
    const url = `/posts/byTag`;
    api
      .get(url)
      .then((response) => {
        setTagList(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setTag(value);
  };

  useEffect(() => {
    getDataByTag();
  }, []);

  return (
    <div className="w-[600px] mx-auto">
      <h1 className=" mt-24 mb-4 text-4xl text-black custom-font text-center">
        Tags
      </h1>

      <div className="flex items-center mb-6">
        <input
          id="email"
          type="text"
          placeholder="Enter Tags Name"
          value={tag}
          onChange={handleInputChange}
          className={`block w-full px-3 py-2 bg-white border 
                rounded-md text-sm shadow-sm placeholder-slate-400
                                        focus:outline-none focus:ring-1`}
        />
        <button
          className="w-[120px] py-2 px-3 ml-4 text-white bg-violet-600  rounded-md"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      <div className="py-8">
        { 
            tagList && tagList.map((data, index) => 
                <TagItem key={index} posts={data.posts} tag={data.tag} />
            )
        }
      </div>
    </div>
  );
};

export default TagsPage;
