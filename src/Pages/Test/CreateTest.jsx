import { useNavigate, useParams } from "react-router-dom";

const CreateTest = () => {
    const navigate = useNavigate();
    const { chapterId } = useParams();

    return (
        <div className="container mx-auto max-w-screen-lg">
            <button onClick={() => navigate(-1)} type="button" className="flex text-lg items-center">
                <svg className="w-5 h-5 rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                </svg>
                <span>Back to Chapter Edit</span>
            </button>
            <h1 className="text-3xl font-bold mb-4">Create New Lesson</h1>

            {chapterId}
        </div>
    )
}

export default CreateTest;