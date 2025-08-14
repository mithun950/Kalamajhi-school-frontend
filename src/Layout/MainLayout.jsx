// MainLayout.jsx
import React from 'react';
import Navbar from '../Shared/Navbar';
import { Outlet, useLocation } from 'react-router-dom';
import Marquee from '../Pages/Home/Marquee';

const MainLayout = () => {
    const location = useLocation(); // বর্তমান route
    return (
        <div>
            {/* শুধুমাত্র Home page-এ Marquee দেখাবে */}
            {location.pathname === '/' && <Marquee />}

            <Navbar /> 

            <div>
                <Outlet />
            </div>
        </div>
    );
};

export default MainLayout;
