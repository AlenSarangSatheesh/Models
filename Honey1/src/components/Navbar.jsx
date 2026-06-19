import { Link } from 'react-router-dom';
import { ShoppingCart, Search, User, Clock, Phone } from 'lucide-react';

export default function Navbar() {
  return (
    <>
      <div className="top-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Clock size={16} color="var(--color-secondary)" /> 8:30 AM - 8:30 PM
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Phone size={16} color="var(--color-secondary)" /> +1 234 567 890
        </div>
      </div>
      <header style={{ backgroundColor: 'var(--color-white)', position: 'sticky', top: 0, zIndex: 1000, boxShadow: 'var(--shadow-sm)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '90px' }}>
          
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ backgroundColor: 'var(--color-primary)', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'white' }}>G</span>
            </div>
            <span style={{ fontSize: '2rem', fontFamily: 'var(--font-heading)', fontWeight: '700', color: 'var(--color-text)' }}>
              Gogrin<span style={{ color: 'var(--color-secondary)' }}>.</span>
            </span>
          </Link>

          <nav>
            <ul style={{ display: 'flex', gap: '2.5rem' }}>
              <li><Link to="/" className="nav-link">Home</Link></li>
              <li><Link to="/about" className="nav-link">About Us</Link></li>
              <li><Link to="/shop" className="nav-link">Shop</Link></li>
              <li><Link to="/contact" className="nav-link">Contact Us</Link></li>
            </ul>
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}><Search size={22} /></button>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}><User size={22} /></button>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'relative' }}>
              <ShoppingCart size={22} />
              <span style={{ position: 'absolute', top: '-8px', right: '-8px', backgroundColor: 'var(--color-secondary)', color: 'white', borderRadius: '50%', width: '18px', height: '18px', fontSize: '0.7rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>2</span>
            </button>
            <Link to="/shop" className="btn btn-primary" style={{ padding: '0.6rem 1.5rem', marginLeft: '1rem' }}>Order Now</Link>
          </div>

        </div>
      </header>
    </>
  );
}
