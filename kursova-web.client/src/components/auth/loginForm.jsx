import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function LoginForm() {

    const router = useNavigate()
    const [user, setUser] = useState({
        email: '',
        password: '',
    });
    const [responseMessage, setResponseMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            fetch('https://localhost:7262/api/v1/auth/login', {
                method: 'post',
                body: JSON.stringify(user),
                headers: { 'Content-Type': 'application/json' }
            })
                .then(r => r.json())
                .then(data => {
                    console.log("resonse", data)
                    console.log("searchForm", user)

                    if (data.success) {
                        localStorage.setItem('token', data.data.token)
                        localStorage.setItem('roles', data.data.roles)
                        router('/survey')
                    }

                    if (data.error) {
                        setResponseMessage(data.error)
                        console.log("error", responseMessage)
                    }
                })


        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };


    return <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <div>
                    <label className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div>
                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                        placeholder="Enter your password"
                        required
                    />
                </div>
            </div>
            <div className="d-flex justify-content-evenly">
                <button type="submit" className="btn btn-primary">Submit</button>
                <button onClick={() => router("/register")} className="btn btn-secondary">Register</button>
            </div>
        </form>
        {responseMessage && <p style={{color: 'red'}}>{responseMessage}</p>}
    </div>
}

export default LoginForm;