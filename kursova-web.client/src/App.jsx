
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppRouter from './components/appRouter';
import Navbar from './components/UI/navbar';

function App() {
    
    return (

        <Router>
            <Navbar />
            <div className="container">
                <AppRouter />
            </div>
        </Router>
    );
}

export default App;