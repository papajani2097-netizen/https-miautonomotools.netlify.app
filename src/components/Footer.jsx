import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail } from 'lucide-react';
import { tools, guidePaths, pages } from '../data/site.js';

export default function Footer() {
  const email = import.meta.env.VITE_CONTACT_EMAIL;
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-brand">
          <Link className="brand footer-logo" to="/">
            <span className="brand-mark"><span>M</span></span>
            <span>MiAutónomo<span className="brand-accent">Tools</span></span>
          </Link>
          <p>Herramientas gratuitas para autónomos en España. Claridad para organizar tus números y tu día a día.</p>
          {email && <a className="footer-email" href={`mailto:${email}`}><Mail size={16} /> {email}</a>}
        </div>
        <div className="footer-column">
          <h2>Herramientas</h2>
          {tools.map((tool) => <Link key={tool.path} to={tool.path}>{tool.title}</Link>)}
        </div>
        <div className="footer-column">
          <h2>Guías</h2>
          {guidePaths.map((path) => <Link key={path} to={path}>{pages[path].name}</Link>)}
          <Link to="/blog/">Todas las guías</Link>
        </div>
        <div className="footer-column">
          <h2>MiAutónomoTools</h2>
          <Link to="/sobre-nosotros/">Sobre nosotros</Link>
          <Link to="/contacto/">Contacto</Link>
          <Link to="/aviso-legal/">Aviso legal</Link>
          <Link to="/politica-de-privacidad/">Privacidad</Link>
          <Link to="/politica-de-cookies/">Cookies</Link>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} MiAutónomoTools</span>
        <span>Herramientas orientativas. Comprueba siempre la información aplicable a tu caso.</span>
        <a href="#top" className="back-top">Volver arriba <ArrowUpRight size={14} /></a>
      </div>
    </footer>
  );
}
