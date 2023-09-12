import { useEffect,useState } from 'react';
import dogImage from '../assets/dog-full.jpg';
import 'react-quill/dist/quill.snow.css';
import api from '../api/api';

const BlogPost = props =>{
    const [data, setData] = useState({});

    useEffect(() => {
        api.get('/posts/64fdaf28e92f5eb09ba2df7b')
        .then((result) => {
            setData(result);
            console.log(result);
        })
        .catch((error) => {
            console.error(error);
        });
    },[])


    return <div className="w-[800px] mx-auto">
        <div className="max-h-80 overflow-hidden">
            <img className="w-full h-auto" src={dogImage}  alt='cover'/>
        </div>
        <h1 className="text-4xl font-bold  mt-8 mb-4">What is Micro Frontend?</h1>
        <div className="text-gray-400 mb-4">於 2023-09-04 發布</div>
        <div className="flex items-center mb-8">
            <button className="bg-sky-50 text-gray-500 rounded-full py-1 px-3 mr-2">frontend</button>
            <button className="bg-sky-50 text-gray-500 rounded-full py-1 px-3 mr-2">frontend</button>
            <button className="bg-sky-50 text-gray-500 rounded-full py-1 px-3">frontend</button>
        </div>
        {<div dangerouslySetInnerHTML={{ __html: data.content }} />}

        {/* <p className="text-xl">
        The micro frontends architecture, being inspired by microservices, is a component-driven approach to building the frontend where each component or feature of the frontend is a self-contained, independently deployable module, worked upon by independent dev teams.

This architecture enables developers to build and update individual components separately without affecting other components or features in the frontend, making the application more scalable, modular, and flexible and at the same time improving collaboration among developers. The micro frontends architecture is a perfect method for breaking down large monolithic applications into nimble, independent units.


        </p>
        <p className='text-xl'>
        The micro frontends architecture, being inspired by microservices, is a component-driven approach to building the frontend where each component or feature of the frontend is a self-contained, independently deployable module, worked upon by independent dev teams.

This architecture enables developers to build and update individual components separately without affecting other components or features in the frontend, making the application more scalable, modular, and flexible and at the same time improving collaboration among developers. The micro frontends architecture is a perfect method for breaking down large monolithic applications into nimble, independent units.


        </p>
        <p className='text-xl'>
        The micro frontends architecture, being inspired by microservices, is a component-driven approach to building the frontend where each component or feature of the frontend is a self-contained, independently deployable module, worked upon by independent dev teams.

This architecture enables developers to build and update individual components separately without affecting other components or features in the frontend, making the application more scalable, modular, and flexible and at the same time improving collaboration among developers. The micro frontends architecture is a perfect method for breaking down large monolithic applications into nimble, independent units.


        </p> */}
        <div className='h-80'></div>
    </div>
}

export default BlogPost;