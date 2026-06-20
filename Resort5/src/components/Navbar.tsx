import Link from "next/link";

export default function Navbar() {
  return (
    <header className="navbar" id="navbar">
      <div className="nav-container w-full flex justify-between items-center">
        <Link href="/" className="logo magnetic" data-strength="20" aria-label="Aura Resort Home">
          AURA
        </Link>
        
        <nav className="nav-links">
          <Link href="#about" className="hover-underline">Experience</Link>
          <Link href="#cabins" className="hover-underline">Cabins</Link>
          <Link href="#amenities" className="hover-underline">Amenities</Link>
        </nav>

        <div className="nav-actions">
          <button className="btn btn-primary magnetic" data-strength="40" aria-label="Book your stay">Book Now</button>
        </div>
      </div>
    </header>
  );
}
