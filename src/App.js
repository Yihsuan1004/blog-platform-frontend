import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

import Login  from './pages/Login';
import Register from './pages/Register';
import RootLayout from './pages/Root';
import HomePage from './pages/Home';
import BlogPost from './pages/BlogPost';
import PostList from './pages/PostList';
import TagList  from './pages/TagList';
import EditPost from './pages/EditPost';

const router = createBrowserRouter([
  {
    path: '/', 
    element: <RootLayout/>,
    children:[
      { path: '/', element: <HomePage />},
      { path: '/posts', element: <PostList />},
      { path: '/posts/:postId', element: <BlogPost />},
      { path: '/tags', element: <TagList />},
      { path: '/edit-post/new', element: <EditPost />},
      { path: '/edit-post/:postId', element: <EditPost />},
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
