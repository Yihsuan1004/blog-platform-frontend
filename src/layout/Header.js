import { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { AiOutlinePlus } from "react-icons/ai";
import { Menu, Transition } from "@headlessui/react";

const Header = (props) => {
  const { isLoggedIn } = useAuth();

  return (
      <header className="w-screen h-14 bg-black flex justify-between items-center px-8">
        <Link to="/">
          <div className="flex justify-between items-center">
            {/* <img className="h-[24px]" src={logoImage} alt="logo" /> */}
            <h3 className="ml-4 text-white">BLOG DEV</h3>
          </div>
        </Link>
        <div className="text-gray-200">
        <Link to="/posts">
          <button className="px-8 py-2 hover:text-white">Posts</button>
        </Link>
        <Link to="/tags">
          <button className="px-8 py-2 hover:text-white">Tags</button>
        </Link>
        </div>

        <div className="flex items-center">
          {isLoggedIn ? (
            <LoggedInComponents />
          ) : (
            <Link to="/login">
              <button className="text-gray-200 px-4 py-2 hover:text-white">
                Sign In
              </button>
            </Link>
          )}
        </div>
      </header>
  );
};
export default Header;



const LoggedInComponents = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <Fragment>
      <Link to="/edit-post/new">
        <button className="flex items-center bg-violet-600 px-4 py-1 text-gray-100 hover:text-white hover:bg-violet-700 duration-150 mr-4 rounded">
          <AiOutlinePlus />
          <p className="ml-2">New Post</p>
        </button>
      </Link>

      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button>
          <div className="w-[32px] h-[32px] rounded-full overflow-hidden bg-gray-500 text-white leading-[32px]">
            C
          </div>
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right bg-white shadow-lg focus:outline-none flex flex-col rounded">
            <Menu.Item as={Fragment}>
              <a
                href="/account-settings"
                className="p-2 text-gray-800 bg-white hover:bg-neutral-100 text-left"
              >
                Account settings
              </a>
            </Menu.Item>
            <Menu.Item as={Fragment}>
              <button
                className="p-2 text-gray-800 bg-white hover:bg-neutral-100 text-left"
                onClick={handleSignOut}
              >
                Sign out
              </button>
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </Fragment>
  );
};
