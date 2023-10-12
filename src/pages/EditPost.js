import React, { useState, useMemo,useEffect } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import { TagsInput } from "react-tag-input-component";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import api from '../api/api';
import useInput from "../hooks/useInput";
import { AiOutlineFileAdd} from "react-icons/ai";


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
    setEnteredValue: setTitle
  } = useInput(validateRequired);


  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);

  const [tags, setTags] = useState([]);
  const [tagsTouched, setTagsTouched] = useState(false);

  const [imageUrl, setImageUrl] = useState('');

  
  const [content, setContent] = useState("");
  const [contentTouched, setContentTouched] = useState(false);

  const tagsIsValid = tags.length > 0 ;
  const tagsInputIsInValid = !tagsIsValid && tagsTouched;

  const contentIsValid = validateContent(content) ;
  const contenttIsInValid = !contentIsValid && contentTouched;

  //取得從文章內容路由傳進來的資料
  const location = useLocation();

  const passedData = location.state;


  useEffect(() => {
    //如果有資料，則將資料顯示在畫面上(表示正在進行編輯)
    if (passedData) {
        setTitle(passedData.title || '');
        setContent(passedData.content || '');
        setTags(passedData.tags || []);
        setImageUrl(passedData.coverImage || '');
    }
}, [passedData]);


  
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
    const selectedFile = e.target.files[0];
    console.log(selectedFile);
    setFile(selectedFile);

    // 如果使用者選擇了圖片，則生成一個預覽URL並設定它
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = function(event) {
        setImageUrl(event.target.result);
      }
      reader.readAsDataURL(selectedFile);
    }
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
        tags,
      };

      await api.post('/posts', postData);

    } catch (error) {
      throw error;
    }
  };

  const updatePost = async (imageUrl) => {
    try {
      const postData = {
        title,
        content,
        coverImage: imageUrl,
        authorId: authorId,
        tags,
      };

      await api.put(`/posts/${passedData._id}`, postData);

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
      if(passedData){
        await updatePost(imageUrl);
        alert('Post update successfully!');
      } else {
        await createPost(imageUrl);
        alert('Post created successfully!');
      }
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
          <div>
            { imageUrl && <img className="mb-4" src={imageUrl} alt="cover"/>}
            <label className="text-violet-600 flex items-center cursor-pointer w-[130px] py-2 px-4 rounded border border-violet-600 hover:border-violet-800 hover:text-violet-800">
                <AiOutlineFileAdd/>
                <span>Select File</span>
              <input 
                className="hidden"
                type="file" 
                accept="image/jpeg, image/png" 
                onChange={onFileChange} 
              />
            </label>
          </div>
          
          
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
          <button type="submit" className="bg-violet-600 text-white px-6 py-2 rounded disabled:opacity-50" disabled={loading || !formIsValid}>
            {loading ? 'Uploading...' : passedData ? 'Update' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPost;
