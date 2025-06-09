import { useState } from "react";
import { Link } from "react-router-dom";
import getAxios from "../AxiosAuth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const Login = () => {
    const navigate = useNavigate();
    const { getUser } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validLogin, setValidLogin] = useState(true);

    const onFormSubmit = async (e) => {
        try {
            e.preventDefault();
            const { data } = await getAxios().post('/api/account/login', { email, password });
            const { token } = data;
            localStorage.setItem('auth-token', token);
            getUser();
            navigate('/');
        }
        catch {
            setValidLogin(false);
        }
    }

    return <div style={{ marginTop: 120 }}>
        <div className="row" style={{ display: 'flex', alignItems: 'center' }}>
            <div className="col-md-6 offset-md-3 bg-light p-4 rounded shadow">
                <h3>Log in to your account</h3>
                {!validLogin && <span className='text-danger'>Invalid username/password. Please try again.</span>}
                <form onSubmit={onFormSubmit}>
                    <input type="text" name="email" placeholder="Email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} />
                    <br />
                    <input type="password" name="password" placeholder="Password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} />
                    <br />
                    <button className="btn btn-primary">Login</button>
                </form>
                <Link to="/signup">Sign up for a new account</Link>
            </div>
        </div>
    </div>
}

export default Login;