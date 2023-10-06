import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login  from './pages/Login';
import Register from './pages/Register';

const router = createBrowserRouter([
  {
    path: '/', 
    element: <Login/>
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
      <RouterProvider router={router}/>
  );
}

export default App;
