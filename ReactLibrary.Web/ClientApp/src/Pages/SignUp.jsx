import getAxios from "../AxiosAuth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onFormSubmit = async (e) => {
        e.preventDefault();
        const user = {firstName, lastName, email}
        await getAxios().post('/api/account/adduser', { user, password });
        navigate('/login');
    }

    return <div className="row" style={{ paddingTop: 120, display: 'flex', alignItems: 'center' }}>
        <div className="col-md-6 offset-md-3 bg-light p-4 rounded shadow">
            <h3>Sign up for a new account</h3>
            <form onSubmit={onFormSubmit}>
                <input type="text" name="firstName" placeholder="First Name" className="form-control" value={firstName} onChange={e => setFirstName(e.target.value)} />
                <br />
                <input type="text" name="lastName" placeholder="Last Name" className="form-control" value={lastName} onChange={e => setLastName(e.target.value)} />
                <br />
                <input type="email" name="email" placeholder="Email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} />
                <br />
                <input type="password" name="password" placeholder="Password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} />
                <br />
                <button className="btn btn-primary">Signup</button>
            </form>
        </div>
    </div>
}

export default SignUp;