import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/Home';
import BlogPost from './pages/BlogPost';
import EditPost from './pages/EditPost';
import PostList from './pages/PostList';
import RootLayout  from './pages/Root';
import Login  from './pages/Login';
import Register from './pages/Register';
import TagsPage  from './pages/TagsPage';

import { AuthProvider } from './contexts/AuthContext';

const router = createBrowserRouter([
  { 
    path: '/', 
    element: <RootLayout/>,
    children:[
      { path: '/', element: <HomePage />},
      { path: '/blog-post/:blogId', element: <BlogPost />},
      { path: '/edit-post/new', element: <EditPost />},
      { path: '/edit-post/:blogId', element: <EditPost />},
      { path: '/posts', element: <PostList />},
      { path: '/tags', element: <TagsPage />}


    ]
  },
  {
    path: '/login', 
    element: <Login/>,
  },
  {
    path: '/register', 
    element: <Register/>,
  }
])

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  );
}

export default App;
