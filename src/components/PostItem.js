import Tag from "./Tag";
import { useEffect, useState , useCallback } from "react";
import { Link } from "react-router-dom";

const PostItem = ({ post, id, isShowAuthor }) => {
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
      <div className="mb-8">
        <Link to={`/posts/${id}`}>
        <div className="flex items-center justify-between w-full mb-2">
          <div>
            <div className="flex items-center my-2">
              <div className="text-left pr-4">
                <h3 className="text-2xl font-semibold">{title}</h3>
                <p className="mt-2 mb-4 text-sm text-gray-600 text-ellipsis">
                  {summary}
                </p>
              </div>
            </div>
            <div className="flex items-center text-sm">
              {tags.map((tag, index) => (
                <Tag name={tag} key={index} classes={"mr-2"} />
              ))}
            </div>
          </div>
          <div className="w-auto">
            {coverImage && (
              <img
                className="w-[112px] h-[112px] object-cover	max-w-none"
                src={coverImage}
                alt="cover"
              />
            )}
          </div>
        </div>
        </Link>
        {isShowAuthor ? (
          <div className="flex items-center mt-4">
            <Link to={`/profile/${author._id}`}>
            <div className="flex items-center">
              {author.profileImage ? (
                <div className="w-[28px] h-[28px] rounded-full border border-gray-200 overflow-hidden">
                  <img src={author.profileImage} alt="avatar" />
                </div>
              ) : (
                <div className="w-[32px] h-[32px] rounded-full border bg-gray-400 text-white text-center leading-[32px] overflow-hidden">
                  {author.fullName[0]}
                </div>
              )}
              <p className="text-violet-600 ml-2 text-sm">{author.fullName}</p>
            </div>
            </Link>
            <p className="text-sm text-gray-400 ml-3 text-sm">{createdDate}</p>
          </div>
        ) : (
          <p className="text-sm text-gray-400 py-2 text-sm">{createdDate}</p>
        )}
      </div>
  );
};

export default PostItem;
