import React, { useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import ImageUploader from "quill-image-uploader";
import 'react-quill/dist/quill.snow.css';
import api from '../api/api';

// register module
Quill.register("modules/imageUploader", ImageUploader);

const EditPost = (props) => {

    const [title, setTitle] = useState("");

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
        // imageUploader: {
        //   upload: (file) => {
        //     return new Promise((resolve, reject) => {
        //       const formData = new FormData();
        //       formData.append("image", file);
    
        //       fetch(
        //         "http://localhost:5200/api/images/upload",
        //         {
        //           method: "POST",
        //           body: formData
        //         }
        //       )
        //         .then((response) => response.json())
        //         .then((result) => {
        //           console.log(result);
        //           resolve(result.data.url);
        //         })
        //         .catch((error) => {
        //           reject("Upload failed");
        //           console.error("Error:", error);
        //         });
        //     });
        //   }
        // }
    };

    //onChange事件可以拿到 (content, delta, source, editor)
    const handleChangeValue = (value,delta) => {
      console.log("rich text", value);
      setValue(value);
    };

    const handleCreate = () =>{
      const post = {
        title: title,
        content: value
      }

      api.post('/posts',post).then(response => {
        console.log(response.data);
      }).catch((error) => {
        console.error(error);
      });

    }

  return (
    <div className="w-screen py-16">
      <div className="w-[720px] mx-auto py-20">
        <div className="mb-8">
          <h3 className="text-2xl font-bold">文章標題</h3>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
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
                onChange={handleChangeValue}
            />
          </div>
        </div>
        <div>
          <button className="bg-sky-700 text-white px-2 py-1 rounded" 
                  onClick={handleCreate}>
                  發布
          </button>
        </div>
        {<div dangerouslySetInnerHTML={{ __html: value }} />}
      </div>
    </div>
  );
};

export default EditPost;
