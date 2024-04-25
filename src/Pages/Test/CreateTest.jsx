import { useNavigate, useParams } from "react-router-dom";

const CreateTest = () =>{
    const navigate = useNavigate();
    const { chapterId } = useParams(); 

    return(
        <>
        {chapterId}
        </>
    )
}

export default CreateTest;