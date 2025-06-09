import {useEffect} from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const { setUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const logout = async () => {
            setUser(null);
            localStorage.removeItem('auth-token');
            navigate('/');
        }
        logout();
    }, []);
    
    return (<></>);
}

export default Logout;