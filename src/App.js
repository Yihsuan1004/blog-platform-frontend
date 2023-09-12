import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/Home';
import BlogPost from './pages/BlogPost';
import EditPost from './pages/EditPost';
import RootLayout  from './pages/Root';
import Login  from './pages/Login';
import { AuthProvider } from './contexts/AuthContext';

const router = createBrowserRouter([
  { 
    path: '/', 
    element: <RootLayout/>,
    children:[
      { path: '/', element: <HomePage />},
      { path: '/blog-post/:blogId', element: <BlogPost />},
      { path: '/edit-post/new', element: <EditPost />},
      { path: '/edit-post/:blogId', element: <EditPost />}

    ]
  },
  {
    path: '/login', 
    element: <Login/>,
  }
])

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  );
}

export default App;
