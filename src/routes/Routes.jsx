import { Routes, Route, Navigate } from 'react-router-dom';
import SigninPage from '../pages/Signin';
import SignupPage from '../pages/Signup';
import DashboardPage from '../pages/Dashboard';
import SpotRegistrationPage from '../pages/SpotRegistration';
import SpotEditPage from '../pages/SpotEdit';
import SpotViewPage from '../pages/SpotView';
import SpotsPage from '../pages/Spots';
import PrivateRoute from './PrivateRoute';

function RoutesComponent() {

    return (
        <Routes>
        <Route path='/login' element={<SigninPage />} />
        <Route path='/cadastro' element={<SignupPage />} />
        <Route path='/' element={<DashboardPage />} />
        <Route path='/dashboard' element={<DashboardPage />} />
        <Route path='/locais' element={<PrivateRoute><SpotsPage /></PrivateRoute>} />
        <Route path='/local' element={<PrivateRoute><SpotRegistrationPage /></PrivateRoute>} />
        <Route path='/local/edit/:id' element={<PrivateRoute><SpotEditPage /></PrivateRoute>} /> 
        <Route path='/local/:id' element={<SpotViewPage />} /> 
        <Route path='*' element={<Navigate replace to='/dashboard' />} />
    </Routes>

    )
} 

export default RoutesComponent