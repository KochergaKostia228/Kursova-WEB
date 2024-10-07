import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function RegisterForm() {

    const router = useNavigate()
    const [user, setUser] = useState({
        email: '',
        password: '',
        acceptPassword: '',
    });
    const [responseMessage, setResponseMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            fetch('https://localhost:7262/api/v1/auth/register', {
                method: 'post',
                body: JSON.stringify(user),
                headers: { 'Content-Type': 'application/json' }
            })
            .then(r => r.json())
            .then(data => {
                console.log("resonse", data)
                console.log("searchForm", user)

                if (data.success) {
                    router('/login')
                }

                if (data.error) {
                    setResponseMessage(data.error)
                }
            }) 


        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return <div>
        <h1>Register</h1>
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
                <div>
                    <label className="form-label">Accept password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        value={user.acceptPassword}
                        onChange={(e) => setUser({ ...user, acceptPassword: e.target.value })}
                        placeholder="Accept password"
                        required
                    />
                </div>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        {responseMessage && <p style={{color: 'red'}}>{responseMessage}</p>}
    </div>
}

export default RegisterForm;