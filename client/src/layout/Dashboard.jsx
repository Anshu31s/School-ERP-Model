import { Outlet } from 'react-router-dom';
import Header from "../components/Header";
import Sidebar from '../components/Sidebar';
const Dashboard = () => {
    return (
        <div>
            <Sidebar />
            <main className='w-[81%] bg-gray-100 float-right '>
                <Header />
                <div className='mt-10 p-8'>
                    <Outlet />
                </div>
            </main>
        </div>
    );
}

export default Dashboard;