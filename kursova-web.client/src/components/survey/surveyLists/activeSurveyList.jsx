import ActiveSurveyCard from "../surveyCard/activeSurveyCard";

function ActiveSurveyList({ surveys, setSurveys }) {
    const RemoveSurvey = (survey) => {
        setSurveys(surveys.filter(s => s.id !== survey.id))
    }

    return (
        <div>
            {surveys.length === 0
                ? <h1 style={{ textAlign: "center" }}>Not surveys!</h1>
                : surveys.map(survey =>
                   <ActiveSurveyCard remove={RemoveSurvey} survey={survey} key={survey.id} />
                )
            }
            
        </div>
    );
}

export default ActiveSurveyList;