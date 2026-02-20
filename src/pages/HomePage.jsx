import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Hero from '../components/Hero/Hero';
import HowItWorks from '../components/HowItWorks/HowItWorks';
import SellerSection from '../components/SellerSection/SellerSection';
import Stats from '../components/Stats/Stats';
import Footer from '../components/Footer/Footer';
import { sellers, stats, sponsors } from '../data/mockData';
import './HomePage.css';

function HomePage() {
  const howItWorksSectionRef = useRef(null);
  const navigate = useNavigate();

  const handleSellerClick = (seller) => {
    navigate(`/seller/${seller.id}`);
  };

  return (
    <div className="home-page">
      <Navbar />
      <main>
        <Hero nextSectionRef={howItWorksSectionRef} />
        <HowItWorks sectionRef={howItWorksSectionRef} />
        <SellerSection sellers={sellers} onSellerClick={handleSellerClick} />
        <Stats stats={stats} />
        <Footer sponsors={sponsors} />
      </main>
    </div>
  );
}

export default HomePage;
