import { Link } from "react-router-dom";

function Home(){
    return(
        <>
            <h1 className=" ">HomePage</h1>
            <Link to="/login">Login</Link>
        </>
    )
}

export default Home;