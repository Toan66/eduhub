import { useNavigate , Link} from "react-router-dom"

const Unauthorized = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
        <div className="container flex m-14 flex-col mx-auto px-6 md:px-12 xl:px-32 items-center justify-center">
            <h1 className="font-bold text-5xl">Unauthorized</h1>
            <br />
            <img src="../../images/401_Unauthorize.jpg" className="justify-center w-full" />
            <p className="font-bold text-3xl justify-center m-10">You do not have access to the requested page.</p>
            <div className="flex flex-row">
                <button onClick={goBack} className="text-2xl inline-block bg-indigo-600 hover:bg-indigo-700 text-white py-1 px-3 rounded m-3">
                    Go Back
                </button>
                <Link reloadDocument to="/" className="text-2xl inline-block bg-indigo-600 hover:bg-indigo-700 text-white py-1 px-3 rounded m-3">
                    Home
                </Link>
            </div>
        </div>
    )
}

export default Unauthorized
