import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CartIcon from './CartIcon';
import MenuDropdown from './MenuDropdown';
import './Navbar.css';

function Navbar() {
  const [activeTab, setActiveTab] = useState('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [trackingQuery, setTrackingQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div
        className="navbar__logo"
        onClick={handleLogoClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && handleLogoClick()}
        aria-label="Ir al inicio"
      >
        <span className="navbar__logo-text">inter</span>
        <span className="navbar__logo-accent">rapidísimo</span>
      </div>

      <div className="navbar__search-area">
        <div className="navbar__tabs" role="tablist" aria-label="Opciones de búsqueda">
          <button
            role="tab"
            aria-selected={activeTab === 'search'}
            className={`navbar__tab${activeTab === 'search' ? ' navbar__tab--active' : ''}`}
            onClick={() => setActiveTab('search')}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            Busca tu producto
          </button>
          <button
            role="tab"
            aria-selected={activeTab === 'track'}
            className={`navbar__tab${activeTab === 'track' ? ' navbar__tab--active' : ''}`}
            onClick={() => setActiveTab('track')}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Rastrea tu envío
          </button>
        </div>

        {activeTab === 'search' && (
          <form
            className="navbar__search-form"
            onSubmit={handleSearchSubmit}
            role="search"
            aria-label="Buscar productos"
          >
            <input
              type="search"
              className="navbar__search-input"
              placeholder="¿Qué producto buscas?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Buscar productos o negocios"
            />
            <button type="submit" className="navbar__search-btn" aria-label="Buscar">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </button>
          </form>
        )}

        {activeTab === 'track' && (
          <form
            className="navbar__search-form"
            onSubmit={handleSearchSubmit}
            role="search"
            aria-label="Rastrear envío"
          >
            <input
              type="search"
              className="navbar__search-input"
              placeholder="Ingresa tu número de guía..."
              value={trackingQuery}
              onChange={(e) => setTrackingQuery(e.target.value)}
              aria-label="Número de guía de envío"
            />
            <button type="submit" className="navbar__search-btn" aria-label="Rastrear">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </button>
          </form>
        )}
      </div>

      <div className="navbar__actions">
        <MenuDropdown />
        <CartIcon />
      </div>
    </nav>
  );
}

export default Navbar;
