import { Link } from "react-router-dom";
import axios from 'axios'
import { useEffect, useState } from "react";

function Home() {
    const [data, setData] = useState(null);

    const getData = async () => {
        try {
            const response = await axios({ method: 'get', url: 'https://localhost:7291/api/Auth', withCredentials: true })
            setData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <h1 className=" text-4xl">HomePage</h1>
        </>
    );
}

export default Home;