import EditSurveyCard from "../surveyCard/editSurveyCard";

function EditSurveyList({ surveys, setSurveys }) {
    const RemoveSurvey = (survey) => {
        setSurveys(surveys.filter(s => s.id !== survey.id))
    }

    return (
        <div>
            {surveys.length === 0
                ? <h1 style={{ textAlign: "center" }}>Not surveys!</h1>
                : surveys.map(survey =>
                    <EditSurveyCard remove={RemoveSurvey} survey={survey} key={survey.id} />
                )
            }
            
        </div>
    );
}

export default EditSurveyList;