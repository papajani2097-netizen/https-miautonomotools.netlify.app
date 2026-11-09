import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Sparkles } from 'lucide-react';
import { useState } from 'react';

const links = [
  ['Inicio', '/'],
  ['Calculadoras', '/calculadora-iva/'],
  ['Facturas', '/generador-facturas/'],
  ['Guías', '/blog/'],
  ['Sobre nosotros', '/sobre-nosotros/']
];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="header-inner container">
        <Link className="brand" to="/" aria-label="MiAutónomoTools, inicio" onClick={() => setOpen(false)}>
          <span className="brand-mark"><Sparkles size={20} strokeWidth={2.5} /></span>
          <span>MiAutónomo<span className="brand-accent">Tools</span></span>
        </Link>
        <button className="menu-toggle" type="button" aria-label={open ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
        <nav className={`main-nav ${open ? 'is-open' : ''}`} aria-label="Navegación principal">
          {links.map(([label, path]) => (
            <NavLink key={path} to={path} end={path === '/'} onClick={() => setOpen(false)}>{label}</NavLink>
          ))}
          <Link className="nav-cta" to="/calculadora-iva/" onClick={() => setOpen(false)}>Probar herramientas</Link>
        </nav>
      </div>
    </header>
  );
}
