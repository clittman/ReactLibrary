import React, { createContext, useContext, useEffect, useState } from 'react';
import getAxios from './AxiosAuth';

const AuthContext = createContext();

const AuthContextComponent = ({ children }) => {

    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getUser();
    }, []);

    const getUser = async() => {
        const { data } = await getAxios().get('/api/account/getcurrentuser');
        setUser(data);
        setIsLoading(false);
    }

    if (isLoading) {
        return <div className="d-flex justify-content-center"><div className="spinner-border" style={{ height: 100, width: 100 }} role="status"><span className="sr-only"></span></div></div>
    }

    return <AuthContext.Provider value={{ user, getUser, setUser }}>
        {children}
    </AuthContext.Provider>

}

const useAuth = () => useContext(AuthContext);


export { AuthContextComponent, useAuth };