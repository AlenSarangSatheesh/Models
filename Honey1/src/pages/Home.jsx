import { Link } from 'react-router-dom';
import { Truck, Star, Clock, HeadphonesIcon } from 'lucide-react';

export default function Home() {
  return (
    <div style={{ backgroundColor: 'var(--color-bg-alt)' }}>
      {/* Hero Section */}
      <section className="bg-honeycomb" style={{ padding: '8rem 0 10rem 0', color: 'white', position: 'relative' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', position: 'relative', zIndex: 5 }}>
          <div style={{ flex: '1 1 500px', paddingRight: '2rem' }}>
            <h5 style={{ color: 'var(--color-text)', marginBottom: '1rem', letterSpacing: '2px', fontWeight: 600 }}>HONEY SHOP... FROM 2002 TO THE PRESENT</h5>
            <h1 style={{ fontSize: '4.5rem', lineHeight: 1.1, marginBottom: '1.5rem', color: 'var(--color-text)' }}>
              Gogrin - Best honey shop in your <span className="text-primary">town.</span>
            </h1>
            <p style={{ fontSize: '1.1rem', marginBottom: '2.5rem', color: 'rgba(62, 39, 35, 0.8)', maxWidth: '500px', fontWeight: 500 }}>
              Honey doesn't lose its sweetness because it is made by bees that sting. Kind words are like honey, sweet to the soul and healthy for the body. It's only money, honey.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Link to="/shop" className="btn btn-primary">Testy Honey</Link>
              <Link to="/about" className="btn btn-dark">Read More</Link>
            </div>
          </div>
          <div style={{ flex: '1 1 500px', display: 'flex', justifyContent: 'center' }}>
            {/* We will use the hero-bg.jpg with a clip-path or just as an image to simulate the jar/comb */}
            <img src="/hero-bg.jpg" alt="Honey jars" style={{ borderRadius: '50%', width: '400px', height: '400px', objectFit: 'cover', border: '15px solid rgba(255,255,255,0.2)', boxShadow: 'var(--shadow-lg)' }} />
          </div>
        </div>
        <div className="drip-bottom"></div>
      </section>

      {/* Features */}
      <section className="section container" style={{ marginTop: '2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', textAlign: 'center' }}>
          {[
            { icon: <Truck size={32} />, title: 'Free Delivery' },
            { icon: <Star size={32} />, title: 'Best Quality Market' },
            { icon: <Clock size={32} />, title: 'Express Shipping' },
            { icon: <HeadphonesIcon size={32} />, title: '24/07 Support' }
          ].map((feature, i) => (
            <div key={i} className="feature-card">
              <div className="icon-box">
                {feature.icon}
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{feature.title}</h3>
              <p style={{ opacity: 0.7, fontSize: '0.9rem' }}>If you want to talk about it with someone, then I'm happy to listen.</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="section container">
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '4rem' }}>
          <div style={{ flex: '1 1 400px' }}>
             <img src="/hero-bg.jpg" alt="Jar of Honey" style={{ borderRadius: '2rem', boxShadow: 'var(--shadow-lg)' }} />
          </div>
          <div style={{ flex: '1 1 500px' }}>
            <h5 style={{ color: 'var(--color-secondary)', marginBottom: '1rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: '#FFB300' }}>✿</span> ABOUT THE GOGRIN HONEY SHOP
            </h5>
            <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem', lineHeight: 1.2 }}>
              A bad day <span className="text-primary">with honey</span> is better than a good day eating <span className="text-primary">anything else.</span>
            </h2>
            <p style={{ marginBottom: '1.5rem', opacity: 0.8 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginTop: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '4rem', fontWeight: 800, color: 'var(--color-primary)', lineHeight: 1 }}>25+</span>
                <span style={{ fontWeight: 700, fontSize: '1.1rem', lineHeight: 1.2, textTransform: 'uppercase' }}>Years Of<br/>Experience</span>
              </div>
              <Link to="/about" className="btn btn-primary" style={{ padding: '1rem 3rem' }}>About Us</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-honeycomb-orange section" style={{ padding: '8rem 0', marginTop: '4rem' }}>
        <div className="drip-top"></div>
        <div className="container" style={{ position: 'relative', zIndex: 5 }}>
          <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '2rem' }}>
            <div className="stat-box">
              <div className="stat-num">29+</div>
              <div style={{ fontWeight: 600, fontSize: '1.1rem', textTransform: 'uppercase' }}>Years of Experienced</div>
            </div>
            <div className="stat-box">
              <div className="stat-num">15k</div>
              <div style={{ fontWeight: 600, fontSize: '1.1rem', textTransform: 'uppercase' }}>Client Satisfaction</div>
            </div>
            <div className="stat-box">
              <div className="stat-num">36+</div>
              <div style={{ fontWeight: 600, fontSize: '1.1rem', textTransform: 'uppercase' }}>Award Winning</div>
            </div>
            <div className="stat-box">
              <div className="stat-num">50+</div>
              <div style={{ fontWeight: 600, fontSize: '1.1rem', textTransform: 'uppercase' }}>Everyday Free Delivery</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
