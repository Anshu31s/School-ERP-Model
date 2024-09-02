import { Outlet } from 'react-router-dom';
import Header from "../components/Header";
const Dashboard = () => {
    return (
        <>
            <Header />
                <main className='mt-16 md:ml-64 bg-gray-100 min-h-screen'>
                    <Outlet />
                </main>
        </>
    );
}

export default Dashboard;