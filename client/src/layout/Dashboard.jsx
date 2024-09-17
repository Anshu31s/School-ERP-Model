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
            <main className='w-full h-screen md:w-[85%] bg-gray-100 md:float-right overflow-x-auto'>
                <Header toggleSidebar={toggleSidebar}/>
                <div className='mt-14 md:mt-10 pt-4 md:pt-8 px-2'>
                    <Outlet />
                </div>
            </main>
        </div>
    );
}

export default Dashboard;