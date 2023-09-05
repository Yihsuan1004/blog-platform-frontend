import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/Home';
import BlogPost from './pages/BlogPost';
import EditPost from './pages/EditPost';
import RootLayout  from './pages/Root';

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
])

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
