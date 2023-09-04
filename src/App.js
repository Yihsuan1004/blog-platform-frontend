import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/Home';
import BlogPost from './pages/BlogPost';
import RootLayout  from './pages/Root';

const router = createBrowserRouter([
  { 
    path: '/', 
    element: <RootLayout/>,
    children:[
      { path: '/', element: <HomePage />},
      { path: '/blog-post/:blogId', element: <BlogPost />}
    ]
  },
])

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
