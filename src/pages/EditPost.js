import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import React, { useState } from "react";


const EditPost = (props) => {

    const [value, setValue] = useState("");

    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            [{ font: [] }],
            [
                "bold",
                "italic",
                "underline",
                "strike",
                "blockquote",
                "code-block",
                "link",
                "header",
                "font",
                "size",
                "list",
                "bullet",
                "indent",
                "link",
                "image",
                "color",
                { align: [] },
            ],
        ],
    };
  return (
    <div className="w-screen py-16">
      <div className="w-[720px] mx-auto py-20">
        <div className="mb-8">
          <h3 className="text-2xl font-bold">文章標題</h3>
          <input
            type="text"
            className="mt-1 block w-full px-3 py-2 bg-white border 
                    border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                    focus:outline-none focus:border-sky-700 focus:ring-1 focus:ring-sky-500
                    "
          />
        </div>
        <div className="mb-8">
          <h3 className="text-2xl font-bold">文章分類</h3>
          <input
            type="text"
            className="mt-1 block w-full px-3 py-2 bg-white border 
                    border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                    focus:outline-none focus:border-sky-700 focus:ring-1 focus:ring-sky-500
                    "
          />
        </div>
        <div className="mb-8">
          <h3 className="text-2xl font-bold">文章封面</h3>
          <input
            type="text"
            className="mt-1 block w-full px-3 py-2 bg-white border 
                    border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                    focus:outline-none focus:border-sky-700 focus:ring-1 focus:ring-sky-500
                    "
          />
        </div>
        <div className="mb-8">
          <h3 className="text-2xl font-bold">文章內容</h3>
          <div className="quillContainer">
            <ReactQuill
                theme="snow"
                placeholder="Enter your rich text edtior"
                modules={modules}
                value={value}
                onChange={setValue}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
