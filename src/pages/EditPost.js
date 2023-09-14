import React, { useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import ImageUploader from "quill-image-uploader";
import 'react-quill/dist/quill.snow.css';
import api from '../api/api';
import { TagsInput } from "react-tag-input-component";
// register module
Quill.register("modules/imageUploader", ImageUploader);

const EditPost = (props) => {

    const [title, setTitle] = useState("");
    const [titleTouched, setTitleTouched] = useState(false);

    const [tags, setTags] = useState([]);
    const [tagsTouched, setTagsTouched] = useState(false);

    const [content, setContent] = useState("");
    const [contentTouched, setContentTouched] = useState(false);


    const titleIsValid = title.trim() !== '';
    const titleInputIsInValid = !titleIsValid && titleTouched;

    const tagsIsValid = tags.length > 0 ;
    console.log(tagsIsValid);
    const tagsInputIsInValid = !tagsIsValid && tagsTouched;

    const contentIsValid = content.trim() !== '' ;
    const contentInputIsInValid = !contentIsValid && contentTouched;
    
     
    const handleTitleInputChange  = event =>{
      setTitleTouched(true);
      setTitle(event.target.value);
  }

  const handleTitleInputBlur  = event =>{
      setTitleTouched(true);
  }

  const handleTagsInputChange  = event =>{
      console.log(event);
      setTags(event.target.value);
      setTagsTouched(true);
  }

  const handleTagsInputBlur  = () =>{
    console.log('blur');
    setTagsTouched(true);
  }

  //onChange事件可以拿到 (content, delta, source, editor)
  const handleContentChange = (value,delta) => {
    console.log("rich text", value);
    setContent(value);
    setContentTouched(true);
  };

  const handleContentBlur  = event =>{
    setContentTouched(true);
  }


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

  

    const handleCreate = () =>{
      const post = {
        title: title,
        tags: tags,
        content: content
      }

      console.log(post);

      api.post('/posts',post).then(response => {
        console.log(response.data);
      }).catch((error) => {
        console.error(error);
      });
    }


    
  const titleInputClasses = titleInputIsInValid ? 'border-red-300 focus:ring-red-500' : 'border-slate-300 focus:ring-sky-500'  ;
  const tagsInputClasses = tagsInputIsInValid ? 'border-red-300 focus:ring-red-500' : 'border-slate-300 focus:ring-sky-500';
  console.log(tagsInputClasses);

  return (
    <div className="w-screen py-16">
      <div className="w-[720px] mx-auto py-20">
        <div className="mb-8">
          <h3 className="text-2xl font-bold">文章標題</h3>
          <input
            type="text"
            value={title}
            placeholder="請輸入文章標題"
            onChange={handleTitleInputChange}
            onBlur={handleTitleInputBlur}
            className={`mt-1 block w-full px-3 py-2 bg-white border 
                     rounded-md text-sm shadow-sm placeholder-slate-400
                    focus:outline-none focus:ring-1 ${titleInputClasses}`}
                    
          />
          {!titleInputIsInValid || <p className="text-red-500 text-sm">標題為必填欄位</p>}
        </div>
        <div className="mb-8">
          <h3 className="text-2xl font-bold">文章分類</h3>
          <TagsInput
            value={tags}
            className={tagsInputClasses}
            onChange={setTags}
            onBlur={handleTagsInputBlur}
            name="fruits"
            placeHolder="輸入文章分類"
          />
        </div>
        <div className="mb-8">
          <h3 className="text-2xl font-bold">文章內容</h3>
          <div className="quillContainer">
            <ReactQuill
                theme="snow"
                placeholder="Enter your rich text edtior"
                modules={modules}
                value={content}
                onChange={(e) =>handleContentChange}
                onBlur={handleContentBlur}
            />
          </div>
        </div>
        <div className="text-right">
          <button className="bg-sky-700 text-white px-2 py-1 rounded" 
                  onClick={handleCreate}>
                  發布
          </button>
        </div>
        {/* {<div dangerouslySetInnerHTML={{ __html: value }} />} */}
      </div>
    </div>
  );
};

export default EditPost;
