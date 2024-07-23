import { useEffect } from "react";
import axios from 'axios';

function Home() {
    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:3001/home', {
            withCredentials: true // Include credentials (cookies) with the request
        })
        .then(result => {
            console.log(result);
            if (result.data !== "Success") {
                // navigate('/login') // Uncomment if you want to navigate to login on failure
            }
        })
        .catch(err => console.log(err));
    }, []);

    return (
        <h2>Home Page</h2>
    );
}

export default Home;
