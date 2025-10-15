import React from 'react';
import Banner from '../Banner';
import LatestNotices from './LeatestNotice';
import FacilitiesSection from './FacilitiesSection';
import Testimonials from './Testimonials';
import OpinionSection from './Opinions';


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <LatestNotices></LatestNotices>
            <FacilitiesSection></FacilitiesSection>
            <Testimonials></Testimonials>
            <OpinionSection></OpinionSection>
        </div>
    );
};

export default Home;