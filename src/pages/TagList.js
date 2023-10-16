import api from "../api/api";
import { useState, useEffect } from "react";
import TagItem from "../components/TagItem";

const TagList = (props) => {
  const [tagList, setTagList] = useState([]);
  const [tag, setTag] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    setLoading(true);
    const url = `/posts/byTag?tag=${tag}`;
    api
      .get(url)
      .then((response) => {
        setTagList(response.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };


  const handleInputChange = (event) => {
    const value = event.target.value;
    setTag(value);
  };

  useEffect(() => {
    const getDataByTag = () => {
      setLoading(true);
      const url = `/posts/byTag`;
      api
        .get(url)
        .then((response) => {
          setTagList(response.data);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setLoading(false);
        });
    };
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
          className="w-[120px] py-2 px-3 ml-4 text-white bg-violet-600  rounded-md disabled:opacity-30"
          disabled={!tag}
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      <div className="py-8">
        {loading ? (
          <div className="w-full text-center">
            <span className="loader-lg"></span>
          </div>
        ) : (
          <div>
            {tagList &&
              tagList.map((data, index) => (
                <TagItem key={index} posts={data.posts} tag={data.tag} />
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TagList;
