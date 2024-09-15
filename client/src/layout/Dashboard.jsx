import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from "../components/Header";
import Sidebar from '../components/Sidebar';
const Dashboard = () => {
    const [showSidebar, setShowSidebar] = useState(false);

    const toggleSidebar = () => {
        setShowSidebar(prev => !prev);
    };

    useEffect(() => {
        if (window.innerWidth < 768) {
            setShowSidebar(false);
        } else {
            setShowSidebar(true);
        }
    }, []);

    return (
        <div>
             <Sidebar showSidebar={showSidebar} />
            <main className='w-full md:w-[81%] bg-gray-100 md:float-right '>
                <Header toggleSidebar={toggleSidebar}/>
                <div className='mt-14 md:mt-10 p-4 md:p-8'>
                    <Outlet />
                </div>
            </main>
        </div>
    );
}

export default Dashboard;