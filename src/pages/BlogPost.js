import { useEffect,useState } from 'react';
import dogImage from '../assets/dog-full.jpg';
import 'react-quill/dist/quill.snow.css';
import api from '../api/api';
import avatar from '../assets/avatar.jpg';
import Tag  from '../components/UI/Tag'; 

const BlogPost = props =>{
    const [data, setData] = useState({});

    useEffect(() => {
        api.get('/posts/64fdaf28e92f5eb09ba2df7b')
        .then((result) => {
            setData(result.data.content);
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
        <div className="flex items-center mb-4">
            <Tag name={'frontend'} classes={'mr-2'}></Tag>
            <Tag name={'frontend'} classes={'mr-2'}></Tag>
            <Tag name={'frontend'} classes={'mr-2'}></Tag>
        </div>
        <div className="flex items-center mb-4">
            <div className="rounded-full w-[40px] h-[40px] overflow-hidden border border-gray-200">
                <img src={avatar} alt="avatar"/>
            </div>
            <div className="ml-4">
                <p className="text-violet-600 text-sm">Cielo Hung</p>
                <p className="text-gray-400 text-sm tracking-wider">19,Jan,2022</p> 
            </div>
        </div>
        <hr className="border border-gray-100" />
        <div className="py-8 blog-content"> 
            {<div dangerouslySetInnerHTML={{ __html: data }} />}
        </div>

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