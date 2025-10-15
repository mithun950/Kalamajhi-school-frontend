// MainLayout.jsx
import React from 'react';
import Navbar from '../Shared/Navbar';
import { Outlet, useLocation } from 'react-router-dom';
import Marquee from '../Pages/Home/Marquee';
import Footer from '../Shared/Footer/Footer';

const MainLayout = () => {
    const location = useLocation(); // বর্তমান route
    return (
        <div className='min-h-screen flex flex-col'>
            {/* শুধুমাত্র Home page-এ Marquee দেখাবে */}
            {location.pathname === '/' && <Marquee />}

            <Navbar /> 

           <main className="flex-1">
        <Outlet /> {/* এখানে তোমার route এর content আসবে */}
      </main>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;
