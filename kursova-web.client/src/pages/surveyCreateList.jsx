import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import EditSurveyList from "../components/survey/surveyLists/editSurveyList";

function SurveyCreateList() {
    const router = useNavigate()
    const [surveys, setSurveys] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const roles = localStorage.getItem('roles');

    useEffect(() => {
        getSurveys();
    }, [])

    return (
        <div>
            <div>
                <button onClick={() => router('/survey/create')}>Create</button>
                {isLoading
                    ? <h1 style={{ textAlign: "center" }}>Loading...</h1>
                    : <EditSurveyList surveys={surveys} setSurveys={setSurveys} />
                }
            </div>
            <button onClick={logOut}>Exit</button>
        </div>
    );

    async function getSurveys() {
        setIsLoading(true)
        const token = localStorage.getItem('token');

        if (token === null || roles !== "Admin") {
            router('/login')
        }

        setTimeout(async ()=>{
            const response = await axios.get('https://localhost:7262/api/v1/survey/noActiveList', {
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

export default SurveyCreateList;