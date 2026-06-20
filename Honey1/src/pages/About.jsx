export default function About() {
  return (
    <div>
      <section className="section" style={{ backgroundColor: 'var(--color-light-bg)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h1 className="section-title" style={{ margin: '0 auto 2rem auto' }}>Our Sweet Story</h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.8 }}>
            From humble beginnings, our sweet company grew. It all started with a simple passion for the earth and a single beehive.
          </p>
        </div>
      </section>

      <section className="section container">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center' }}>
          <div style={{ flex: '1 1 400px' }}>
            <img 
              src="/hero-bg.jpg" 
              alt="Beekeeping" 
              style={{ borderRadius: '1rem', boxShadow: 'var(--shadow-lg)' }} 
            />
          </div>
          <div style={{ flex: '1 1 400px' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: 'var(--color-primary-hover)' }}>A Family Tradition</h2>
            <p style={{ marginBottom: '1rem', opacity: 0.8 }}>
              We would harvest our own honey for breakfast. It was a family tradition and a skill passed down from generation to generation. We then decided to share our simple passion with the world. And now here we are!
            </p>
            <p style={{ opacity: 0.8 }}>
              Every jar of Arabelle Honey represents our commitment to sustainable farming, ethical practices, and above all, providing the purest, most natural honey possible.
            </p>
          </div>
        </div>
      </section>
      
      <section className="section container" style={{ textAlign: 'center' }}>
         <h2 className="section-title">25+ Years of Experience</h2>
         <p style={{ maxWidth: '600px', margin: '0 auto', opacity: 0.8 }}>
           Over the years we have perfected the art of beekeeping. We respect the bees, the environment, and our customers. That's why people choose our product time and time again.
         </p>
      </section>
    </div>
  );
}
