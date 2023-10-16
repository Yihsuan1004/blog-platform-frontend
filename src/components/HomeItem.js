import Tag from "./Tag";
import { Link } from "react-router-dom";
import { useEffect, useState , useCallback } from "react";

const HomeItem = ({ post, id }) => {
  const { content, title, tags, coverImage, author, createdDate } = post;

  const [summary, setSummary] = useState("");

  const getSummary =  useCallback(() => {
    const domParser = new DOMParser();
    const doc = domParser.parseFromString(content, "text/html");
    const textContent = doc.body.textContent;
    setSummary(textContent);
  },[content]);

  useEffect(() => {
    getSummary();
  }, [getSummary]);

  return (
    <div className="mx-auto py-8 w-auto">
        <Link to={`/posts/${id}`}>
        <div className="h-[200px] overflow-hidden relative bg-gray-900">
          <img className="w-full h-auto absolute top-1/2 -translate-y-1/2" src={coverImage} alt="cover" />
        </div>
        <div className="text-left">
          <h3 className="text-2xl font-semibold">{title}</h3>
          <p className="mt-2 mb-4 text-sm text-gray-600 text-ellipsis">
            {summary}
          </p>
        </div>
        </Link>
        <div className="flex items-center text-sm">
          {tags.map((tag, index) => (
            <Tag name={tag} key={index} classes={"mr-2"} />
          ))}
        </div>
        <div className="flex items-center my-4">
          {author.profileImage ? (
            <div className="w-[28px] h-[28px] rounded-full border border-gray-200 overflow-hidden">
              <img src={author.profileImage} alt="avatar" />
            </div>
          ) : (
            <div className="w-[32px] h-[32px] rounded-full border bg-gray-400 text-white text-center leading-[32px] overflow-hidden">
              {author.fullName[0]}
            </div>
          )}
          <Link to={`/profile/${author._id}`}>
            <p className="text-violet-600 ml-2 text-sm">{author.fullName}</p>
          </Link>
          <p className="text-sm text-gray-400 ml-3 text-sm">{createdDate}</p>
        </div>
      </div>
  );
};

export default HomeItem;
