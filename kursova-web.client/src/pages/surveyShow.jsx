import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import EditSurveyList from "../components/survey/surveyLists/editSurveyList";
import ActiveSurveyList from "../components/survey/surveyLists/activeSurveyList";

function SurveyShow() {
    const router = useNavigate()
    const [surveys, setSurveys] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const roles = localStorage.getItem('roles');

    useEffect(() => {
        getSurveys();
    }, [])

    return (
        <div>
            {isLoading
                ? <h1 style={{ textAlign: "center" }}>Loading...</h1>
                : <ActiveSurveyList surveys={surveys} setSurveys={setSurveys} />
            }
            <button onClick={logOut}>Exit</button>
        </div>
    );

    async function getSurveys() {
        setIsLoading(true)
        const token = localStorage.getItem('token');

        if (token === null) {
            router('/login')
        }

        setTimeout(async ()=>{
            const response = await axios.get('https://localhost:7262/api/v1/survey/activeList', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setSurveys(response.data.data)
            setIsLoading(false)
        }, 1000)

    };

    function logOut() {
        localStorage.removeItem('token');
        router('/login')
    }
}

export default SurveyShow;