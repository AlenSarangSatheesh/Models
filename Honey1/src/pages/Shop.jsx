export default function Shop() {
  const products = [
    { name: 'Acacia Honey', price: '$12.00', tag: 'Organic', img: '/hero-bg.jpg' },
    { name: 'Manuka Honey', price: '$24.00', tag: 'Premium', img: '/hero-bg.jpg' },
    { name: 'Wildflower Honey', price: '$10.00', tag: 'Natural', img: '/hero-bg.jpg' },
    { name: 'Clover Honey', price: '$9.00', tag: 'Classic', img: '/hero-bg.jpg' },
    { name: 'Orange Blossom', price: '$14.00', tag: 'Fruity', img: '/hero-bg.jpg' },
    { name: 'Buckwheat Honey', price: '$15.00', tag: 'Rich', img: '/hero-bg.jpg' },
  ];

  return (
    <div className="section container">
      <h1 style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '1rem' }}>SHOP OUR <span className="text-primary">HONEY</span></h1>
      <p style={{ textAlign: 'center', marginBottom: '3rem', opacity: 0.8, maxWidth: '600px', margin: '0 auto 3rem auto', fontFamily: 'var(--font-main)' }}>
        Browse our collection of ethically sourced, 100% natural honey. Each jar is packed with care from our hives to your home.
      </p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2.5rem' }}>
        {products.map((product, i) => (
          <div key={i} style={{ backgroundColor: 'var(--color-bg)', border: '1px solid #eee', borderRadius: '1rem', padding: '1.5rem', textAlign: 'center', transition: 'var(--transition)', boxShadow: 'var(--shadow-sm)' }}>
             <div style={{ height: '250px', width: '100%', borderRadius: '0.5rem', marginBottom: '1.5rem', overflow: 'hidden', position: 'relative' }}>
                <span style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'var(--color-secondary)', color: 'white', padding: '0.3rem 1rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold', zIndex: 5 }}>
                  {product.tag}
                </span>
                <img src={product.img} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'} />
             </div>
             <h3 style={{ marginBottom: '0.5rem', fontSize: '1.5rem' }}>{product.name}</h3>
             <p style={{ color: 'var(--color-secondary)', fontWeight: 'bold', fontSize: '1.4rem', marginBottom: '1.5rem' }}>{product.price}</p>
             <button className="btn btn-primary" style={{ width: '100%' }}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}
