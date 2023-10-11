import React, { useState, useMemo  } from "react";
import { useNavigate } from "react-router-dom";
import { TagsInput } from "react-tag-input-component";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import api from '../api/api';
import useInput from "../hooks/useInput";


const EditPost = (props) => {
  const navigate = useNavigate();
  
  const validateRequired = (value) => {
    if (value.trim() === '') {
      return { isValid: false };
    }
    return { isValid: true };
  };

  const validateContent = (content) =>{
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const textContent = doc.body.textContent || "";
    // 檢查是否有非空白字符
    return textContent.trim().length > 0;
  }

  const {
    value: title,
    isValid: titleIsValid,
    hasError: titleInputHasError,
    valueChangeHandler: titleChangeHandler,
    inputBlurHandler: titleBlurHandler,
  } = useInput(validateRequired);


  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);

  const [tags, setTags] = useState([]);
  const [tagsTouched, setTagsTouched] = useState(false);

  
  const [content, setContent] = useState("");
  const [contentTouched, setContentTouched] = useState(false);

  const tagsIsValid = tags.length > 0 ;
  const tagsInputIsInValid = !tagsIsValid && tagsTouched;

  const contentIsValid = validateContent(content) ;
  const contenttIsInValid = !contentIsValid && contentTouched;


  
  let formIsValid = false;

  if (titleIsValid && tagsIsValid && contentIsValid ) {
    formIsValid = true;
  }



  const handleTagsInputBlur  = () =>{
    setTagsTouched(true);
  }

  //onChange事件可以拿到 (content, delta, source, editor)
  const handleContentChange = (value, delta) => {
    setContent(value);
  };


  /**  
   * Called when the editor loses focus. 
   * It will receive the selection range it had right before losing focus.*/
  const handleContentBlur = (previousRange, source, editor) => {
    setContentTouched(true);
  };

  const authorId = JSON.parse(localStorage.getItem("user")).data.id;
 
  const modules = useMemo(() => ({
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
            { align: [] },
        ],
    ]
  }), []); 

  const onFileChange = (e) =>{
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  }

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await api.post('/images/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      return response.data.data.url; 
    } catch (error) {
      throw error;
    }
  };

  
  const createPost = async (imageUrl) => {
    try {
      const postData = {
        title,
        content,
        coverImage: imageUrl,
        authorId: authorId,
        tags: tags,
      };

      await api.post('/posts', postData);

    } catch (error) {
      throw error;
    }
  };

     
  const onSubmit = async (e) =>{
    e.preventDefault();
    if(file === null){
      alert('Please select cover image!');
      return;
    }
    setLoading(true);
    try {
      const imageUrl = await uploadImage();
      await createPost(imageUrl);
      alert('Post created successfully!');
      navigate("/");
    } catch (error) {
      console.error("An error occurred:", error);
      alert('An error occurred:',error.message);
    } finally {
      setLoading(false);
    }
  }


    
  const titleInputClasses = titleInputHasError ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:ring-sky-500'  ;
  const tagsInputClasses = tagsInputIsInValid ? 'border-red' : 'border-slate';
  const contentClasses = contenttIsInValid ? 'border border-red-500 focus:border-red-500' : '';
  return (
    <div className="w-screen py-16">
      <form className="w-[720px] mx-auto pb-20 pt-10" onSubmit={onSubmit}>
        <h1 className=" mb-4 text-4xl text-black custom-font text-center">Create Post</h1>
        <div className="mb-8">
          <h3 className="text-xl mb-1">Title</h3>
          <input
            type="text"
            value={title}
            placeholder="請輸入文章標題"
            onChange={titleChangeHandler}
            onBlur={titleBlurHandler}
            className={`mt-1 block w-full px-3 py-2 bg-white border 
                     rounded-md text-sm shadow-sm placeholder-slate-400
                    focus:outline-none focus:ring-1 ${titleInputClasses}`}
                    
          />
          {titleInputHasError && <p className="text-red-500 text-sm">Title is required</p>}
        </div>
        <div className="mb-8">
          <h3 className="text-xl mb-1">Tags</h3>
          <TagsInput
            value={tags}
            classNames={{ input: tagsInputClasses}}
            onChange={setTags}
            onBlur={handleTagsInputBlur}
            name="tags"
            placeHolder="輸入文章分類"
          />
          { tagsInputIsInValid  &&  <p className="text-red-500 text-sm">Please enter at least one tag</p>}
        </div>
        <div className="mb-8">
          <h3 className="text-2xl mb-1">Cover Image</h3>
          <input 
            type="file" 
            accept="image/jpeg, image/png" 
            onChange={onFileChange} 
          />
        </div>
        <div className="mb-8">
          <h3 className="text-2xl mb-1">Content</h3>
            <ReactQuill
                theme="snow"
                placeholder="Enter your rich text edtior"
                modules={modules}
                value={content}
                className={contentClasses}
                onBlur={handleContentBlur}
                onChange={handleContentChange}
            />
          {contenttIsInValid && <p className="text-red-500 text-sm">Please enter valid content</p>}
        </div>
        <div className="text-right">
          <button className="bg-violet-600 text-white px-6 py-2 rounded disabled:opacity-50"  type="submit" disabled={loading || !formIsValid}>
            {loading ? 'Uploading...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPost;
