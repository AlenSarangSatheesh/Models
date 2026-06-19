import { Link } from 'react-router-dom';
import { Hexagon } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--color-light-bg)', borderTop: '1px solid var(--color-border)', paddingTop: '4rem', paddingBottom: '2rem' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
        <div>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-primary-hover)', marginBottom: '1rem' }}>
            <Hexagon fill="var(--color-primary)" />
            Arabelle Honey
          </Link>
          <p style={{ color: 'var(--color-text)', opacity: 0.8 }}>Organic, ethically sourced honey from our hives to your home. Best honey shop in your town.</p>
        </div>
        <div>
          <h4 style={{ marginBottom: '1rem' }}>Quick Links</h4>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">Our Story</Link></li>
            <li><Link to="/shop">Shop</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 style={{ marginBottom: '1rem' }}>Contact Us</h4>
          <p>Don't hesitate to contact us.</p>
          <p style={{ marginTop: '0.5rem', fontWeight: 'bold' }}>+1 (234) 567-890</p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', fontWeight: 'bold' }}>
            <Link to="#">FB</Link>
            <Link to="#">TW</Link>
            <Link to="#">IG</Link>
          </div>
        </div>
      </div>
      <div className="container" style={{ textAlign: 'center', borderTop: '1px solid var(--color-border)', paddingTop: '2rem', opacity: 0.7, fontSize: '0.9rem' }}>
        &copy; {new Date().getFullYear()} Arabelle Honey Company. All Rights Reserved.
      </div>
    </footer>
  );
}
