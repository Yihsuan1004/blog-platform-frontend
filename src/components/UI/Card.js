import logoImage from '../../assets/logo-black.svg';


const Card = ({ children, buttonName }) =>{

    return <div className="w-screen h-screen bg-slate-900">
            <div className="w-[480px] mx-auto py-12 px-16 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-white rounded shadow-xl">
                <div className="flex items-center mb-6 justify-center">
                    <img className="w-[30px] h-auto" src={logoImage} alt="logo" />
                    <h1 className="text-3xl ml-2 font-bold">BLOG DEV</h1>
                </div>
                {children}
            </div>
        </div>
}

export default Card;