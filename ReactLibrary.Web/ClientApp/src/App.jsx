import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './Pages/Home';
import SignUp from './Pages/SignUp';
import Login from './Pages/Login';
import Logout from './Pages/Logout';
import MyFavorites from './Pages/MyFavorites';
import PrivateRoute from './components/PrivateRoute';
import { AuthContextComponent } from './AuthContext';
import Search from './Pages/Search';

const App = () => {
    return (
        <AuthContextComponent>
            <Layout>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/signup' element={<SignUp />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/logout' element={<Logout />} />
                    <Route path='/search' element={<Search />} />
                    <Route path='/myfavorites' element={<PrivateRoute><MyFavorites /></PrivateRoute>} />
                </Routes>
            </Layout>
        </AuthContextComponent>
    );
}

export default App;