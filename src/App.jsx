import { Link, Route, Routes, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import SEO from './components/SEO.jsx';
import HomePage from './pages/HomePage.jsx';
import ToolPage from './pages/ToolPage.jsx';
import ContentPage from './pages/ContentPage.jsx';

function NotFound() {
  const { pathname } = useLocation();
  return <>
    <SEO title="Página no encontrada" description="No hemos encontrado la página que buscas." path={pathname} noIndex />
    <main className="not-found"><span className="eyebrow">ERROR 404</span><h1>Esta página no está<br /><span>donde esperabas.</span></h1><p>Puede que el enlace haya cambiado o que la dirección no sea correcta.</p><Link className="button button-primary" to="/"><ArrowLeft size={16} /> Volver al inicio</Link></main>
  </>;
}

const toolPaths = [
  '/calculadora-cuota-autonomos/',
  '/calculadora-iva/',
  '/calculadora-irpf/',
  '/calculadora-beneficio-neto/',
  '/generador-facturas/',
  '/calculadora-impuestos-trimestrales/'
];

const contentPaths = [
  '/gastos-deducibles-autonomos/',
  '/tarifa-plana-autonomos/',
  '/calendario-fiscal/',
  '/como-ser-autonomo/',
  '/blog/',
  '/sobre-nosotros/',
  '/contacto/',
  '/politica-de-privacidad/',
  '/politica-de-cookies/',
  '/aviso-legal/'
];

export default function App() {
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">Saltar al contenido</a>
      <Header />
      <div id="main-content"><Routes>
        <Route path="/" element={<HomePage />} />
        {toolPaths.map((path) => <Route key={path} path={path} element={<ToolPage path={path} />} />)}
        {contentPaths.map((path) => <Route key={path} path={path} element={<ContentPage path={path} />} />)}
        <Route path="*" element={<NotFound />} />
      </Routes></div>
      <Footer />
    </div>
  );
}
