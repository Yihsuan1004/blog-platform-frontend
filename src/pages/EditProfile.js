import api from "../api/api";
import { useNavigate, useParams } from "react-router-dom";
import useInput from "../hooks/useInput";
import { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";

const EditProfile = (props) => {

  const navigate = useNavigate();
  
  const userId = JSON.parse(localStorage.getItem("user")).data.id;

  const validateRequired = (value) => {
    if (value.trim() === "") {
      return { isValid: false };
    }
    return { isValid: true };
  };

  const [author,setAuthor] = useState( { fullName: "", bio: "", profileImage: "" });
  const [profileImage, setProfileImage] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);


  const {
    value: fullName,
    isValid: fullNameIsValid,
    hasError: fullNameInputHasError,
    valueChangeHandler: fullNameChangeHandler,
    inputBlurHandler: fullNameBlurHandler,
    setEnteredValue: setFullName,
  } = useInput(validateRequired);

  const {
    value: bio,
    valueChangeHandler: bioChangeHandler,
    inputBlurHandler: bioBlurHandler,
    setEnteredValue: setBio,
  } = useInput((value) => {
    return true;
  });

  

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = () =>{
    api.get(`/users/${userId}/profile`)
    .then((result) =>{
      const author = result.data;
      setAuthor(author);
      setProfileImage(author.profileImage);
      setFullName(author.fullName);
      setBio(author.bio);
    })
    .catch((error) =>{
      alert('An error occurred:',error.message);
      console.error(error);
    });
  }

  const updateProfile = async () => {
    try {
      const profile = {
        fullName,
        bio,
        profileImage,
      };
      await api.put(`/users/${userId}/profile`, profile);
    } catch (error) {
      throw error;
    }
  };

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await api.post("/images/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data.data.url;
    } catch (error) {
      throw error;
    }
  };

  const onFileChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log(selectedFile);
    setFile(selectedFile);

    // 如果使用者選擇了圖片，則生成一個預覽URL並設定它
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = function (event) {
        setProfileImage(event.target.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!formIsValid) return;
    if (profileImage === null && file === null) {
      alert("Please select cover image!");
      return;
    }
    setLoading(true);
    try {
      const imageUrl = file ? await uploadImage() : profileImage;
      await updateProfile(imageUrl);
      alert("Profile update successfully!");
      navigate(`/profile/${userId}`);
    } catch (error) {
      console.error("An error occurred:", error);
      alert("An error occurred:", error.message);
    } finally {
      setLoading(false);
    }
  };

  let formIsValid = false;

  if (fullNameIsValid) {
    formIsValid = true;
  }

  const fullNameInputClasses = fullNameInputHasError
    ? "border-red-500 focus:ring-red-500"
    : "border-violet-300 focus:ring-violet-500";

  const avatarClasses = profileImage
    ? "border-gray-200"
    : "bg-gray-400 text-white text-center text-3xl leading-[100px]";

  return (
    <div className="w-[400px] mx-auto mt-20 rounded mt-8 p-8 shadow-xl border border-gray-200">
      <section className="mb-8 flex justify-center relative">
        <div
          className={`w-[100px] h-[100px] rounded-full overflow-hidden border border-gray-200 relative ${avatarClasses}`}
        >
          {profileImage ? (
            <img src={profileImage} alt="profile" />
          ) : (
            <span> {author.fullName[0]}</span>
          )}
        </div>
        <label className="absolute rounded-full border border-gray-300 bg-white p-1 text-gray-800 text-sm right-[36%] bottom-2 cursor-pointer">
          <AiFillEdit />
          <input
            className="hidden"
            type="file"
            accept="image/jpeg, image/png"
            onChange={onFileChange}
          />
        </label>
      </section>
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <h3 className="text-l mb-1">FullName</h3>
          <input
            type="text"
            value={fullName}
            placeholder="Your FullName"
            onChange={fullNameChangeHandler}
            onBlur={fullNameBlurHandler}
            className={`mt-1 block w-full px-3 py-2 bg-white border 
                        rounded-md text-sm shadow-sm placeholder-slate-400
                        focus:outline-none focus:ring-1 ${fullNameInputClasses}`}
          />
          {fullNameInputHasError && (
            <p className="text-red-500 text-sm">FullName is required</p>
          )}
        </div>
        <div className="mb-8">
          <h3 className="text-l mb-1">Bio</h3>
          <textarea
            rows={5}
            value={bio}
            placeholder="Bio"
            onChange={bioChangeHandler}
            onBlur={bioBlurHandler}
            className="mt-1 block w-full px-3 py-2 bg-white border 
                        rounded-md text-sm shadow-sm placeholder-slate-400
                        focus:border-violet-300 focus:ring-violet-500
                        focus:outline-none focus:ring-1"
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={loading || !formIsValid}
          className="px-4 py-2 bg-violet-600 hover:bg-violet-700  duration-200 text-white w-full rounded cursor-pointer disabled:opacity-50 disabled:cursor-auto"
        >
          {loading ? "Uploading..." : "Update"}
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
