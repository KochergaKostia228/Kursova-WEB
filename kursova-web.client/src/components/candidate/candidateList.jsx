import { useNavigate } from "react-router-dom";
import axios from "../../../../node_modules/axios/index";

function CandidateList({ survey, remove }) {
    const router = useNavigate()
    const surveyId = survey.id

    const DeleteCandidate = async (candidate) => {
        const token = localStorage.getItem('token');

        if (token === null) {
            router('/login')
        }

        const response = await axios.delete(`https://localhost:7262/api/v1/candidate/delete/${candidate.id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        console.log(response.data)

        if (response.data.success) {
            remove(candidate)
            router(`/survey/edit/${surveyId}`)
        }
    }

    return (
        <table className="table">
            <thead>
                <tr>
                   <th scope="col">#</th>
                   <th scope="col">Name</th>
                   <th scope="col"></th>
                   <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                {survey.candidates.map(candidate =>
                    <tr key={candidate.id}>
                        <th scope="row">{candidate.id}</th>
                        <td>{candidate.name}</td>
                        <td>
                            <button onClick={() => router(`/candidate/edit/${surveyId}/${candidate.id}`)} className="btn btn-primary">Edit</button>
                            <button type="button" onClick={() => DeleteCandidate(candidate)} className="btn btn-secondary">Delete</button>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}

export default CandidateList;