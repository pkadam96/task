import { Routes, Route } from 'react-router-dom';
import { Register } from '../components/Register';
import { Login } from '../components/Login';
import { Homepage } from '../components/Homepage';

const AllRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Login/>} />
                <Route path="/register" element={<Register/>} />
                <Route path="/home" element={<Homepage/>} />
            </Routes>
        </>
    )
}
export { AllRoutes }