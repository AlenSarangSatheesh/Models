import { Mail, Phone, MapPin } from 'lucide-react';

export default function Contact() {
  return (
    <div className="section container">
      <h1 className="section-title">Get In Touch</h1>
      <p style={{ textAlign: 'center', marginBottom: '4rem', opacity: 0.8, maxWidth: '600px', margin: '0 auto 4rem auto' }}>
        We'd love to hear from you! Whether you have a question about our honey, sustainable practices, or just want to say hello.
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem' }}>
        <div style={{ flex: '1 1 300px' }}>
          <h2 style={{ marginBottom: '2rem' }}>Contact Information</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ backgroundColor: 'var(--color-light-bg)', padding: '1rem', borderRadius: '50%' }}>
                <Phone color="var(--color-primary)" />
              </div>
              <div>
                <h4 style={{ margin: 0 }}>Phone</h4>
                <p style={{ margin: 0, opacity: 0.8 }}>+91 98765 43210</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ backgroundColor: 'var(--color-light-bg)', padding: '1rem', borderRadius: '50%' }}>
                <Mail color="var(--color-primary)" />
              </div>
              <div>
                <h4 style={{ margin: 0 }}>Email</h4>
                <p style={{ margin: 0, opacity: 0.8 }}>hello@arabellehoney.com</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ backgroundColor: 'var(--color-light-bg)', padding: '1rem', borderRadius: '50%' }}>
                <MapPin color="var(--color-primary)" />
              </div>
              <div>
                <h4 style={{ margin: 0 }}>Location</h4>
                <p style={{ margin: 0, opacity: 0.8 }}>45 MG Road, Indiranagar, Bengaluru, Karnataka 560038</p>
              </div>
            </div>
          </div>
        </div>

        <div style={{ flex: '2 1 400px' }}>
          <form className="glass" style={{ padding: '2rem', borderRadius: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>First Name</label>
                <input type="text" style={{ width: '100%', padding: '0.8rem', borderRadius: '0.5rem', border: '1px solid var(--color-border)', outline: 'none' }} placeholder="John" />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Last Name</label>
                <input type="text" style={{ width: '100%', padding: '0.8rem', borderRadius: '0.5rem', border: '1px solid var(--color-border)', outline: 'none' }} placeholder="Doe" />
              </div>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Email</label>
              <input type="email" style={{ width: '100%', padding: '0.8rem', borderRadius: '0.5rem', border: '1px solid var(--color-border)', outline: 'none' }} placeholder="john@example.com" />
            </div>
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Message</label>
              <textarea rows="5" style={{ width: '100%', padding: '0.8rem', borderRadius: '0.5rem', border: '1px solid var(--color-border)', outline: 'none', resize: 'vertical' }} placeholder="How can we help you?"></textarea>
            </div>
            <button type="button" className="btn btn-primary" style={{ width: '100%' }}>Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
}
