import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { routes } from '../router/index';
import SurveyShow from '../pages/surveyShow';
import * as React from 'react';
function AppRouter() {

    return (
        <Routes>
            {routes.map((route, index) => (
                <Route key={index} path={route.path} element={React.createElement(route.component)} exact={route.exact} />
            ))}
            <Route path="*" element={<SurveyShow />} />
        </Routes>
    );
}

export default AppRouter;