import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight, ArrowUpRight, Search, ShieldCheck, Sparkles, WandSparkles } from 'lucide-react';
import SEO from '../components/SEO.jsx';
import ToolCard from '../components/ToolCard.jsx';
import { tools, pages, guidePaths } from '../data/site.js';

const categories = [
  { title: 'Impuestos', description: 'Organiza tus cálculos y revisa tus cifras.', icon: '％', path: '/calculadora-iva/' },
  { title: 'Facturación', description: 'Prepara operaciones y documentos.', icon: '↗', path: '/generador-facturas/' },
  { title: 'Finanzas', description: 'Ten tus ingresos y costes más a mano.', icon: '€', path: '/calculadora-beneficio-neto/' },
  { title: 'Gestión', description: 'Encuentra guías para tu actividad.', icon: '✓', path: '/blog/' }
];

const faqs = [
  ['¿Las herramientas de MiAutónomoTools son gratuitas?', 'Sí. Las herramientas disponibles se pueden usar gratis y no requieren crear una cuenta.'],
  ['¿Las calculadoras ofrecen asesoramiento fiscal?', 'No. Realizan operaciones aritméticas con los datos que introduces. No determinan obligaciones fiscales ni sustituyen el asesoramiento profesional.'],
  ['¿Qué tipo de IVA o retención debo utilizar?', 'Debes introducir el porcentaje que hayas comprobado que resulta aplicable a tu operación. Consulta fuentes oficiales o a un profesional si tienes dudas.'],
  ['¿Se guardan los datos que introduzco?', 'Las calculadoras procesan los datos en tu navegador y esta aplicación no dispone de un servidor propio para guardarlos. Evita introducir información sensible.']
];

export default function HomePage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const filtered = useMemo(() => tools.filter((tool) => {
    const matchesText = `${tool.title} ${tool.description} ${tool.category}`.toLocaleLowerCase('es').includes(query.toLocaleLowerCase('es').trim());
    return matchesText && (!category || tool.category === category);
  }), [query, category]);

  return (
    <>
      <SEO title={pages['/'].title} description={pages['/'].description} path="/" />
      <main>
        <section className="hero-section" id="top">
          <div className="hero-glow hero-glow-one" /><div className="hero-glow hero-glow-two" />
          <div className="container hero-layout">
            <div className="hero-copy">
              <span className="hero-kicker"><Sparkles size={15} /> PARA PROFESIONALES POR CUENTA PROPIA</span>
              <h1>Todas las herramientas que necesitas <span>como autónomo</span></h1>
              <p>Calcula impuestos, cuotas, facturas y gastos con herramientas sencillas y gratuitas, pensadas para tu día a día en España.</p>
              <div className="hero-actions"><a className="button button-mint" href="#herramientas">Explorar herramientas <ArrowRight size={17} /></a><Link className="hero-secondary" to="/como-ser-autonomo/">Guía para empezar <ArrowUpRight size={16} /></Link></div>
              <div className="hero-reassurance"><span><ShieldCheck size={17} /> Gratis y sin registro</span><span><WandSparkles size={17} /> Cifras en tu navegador</span></div>
            </div>
            <div className="hero-visual" aria-hidden="true">
              <div className="visual-topline"><span className="visual-dot" /><span>Tu espacio de trabajo</span><span className="visual-menu">•••</span></div>
              <div className="visual-greeting">Un poco más de claridad</div>
              <div className="visual-title">Tu actividad,<br />en orden.</div>
              <div className="visual-summary"><span>Herramientas disponibles</span><strong>Simples. Claras. Gratuitas.</strong></div>
              <div className="visual-chart"><div className="chart-labels"><span>Organiza</span><span>Calcula</span><span>Decide</span></div><div className="chart-bars"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div></div>
              <div className="visual-floating"><span className="floating-icon">€</span><span><small>Un primer paso</small><strong>Empieza con una calculadora</strong></span><ArrowUpRight size={16} /></div>
            </div>
          </div>
          <a className="hero-scroll" href="#herramientas">Descubre las herramientas <ArrowDown size={14} /></a>
        </section>

        <section className="section tools-section" id="herramientas">
          <div className="container">
            <div className="section-heading section-heading-row">
              <div><span className="eyebrow">TU CAJA DE HERRAMIENTAS</span><h2>Resuelve tus números,<br /><span>sin complicaciones.</span></h2></div>
              <p>Recursos prácticos y gratuitos para ayudarte a organizar tareas habituales de tu actividad.</p>
            </div>
            <div className="tool-search-wrap">
              <Search size={19} aria-hidden="true" />
              <label className="sr-only" htmlFor="tool-search">Buscar herramientas</label>
              <input id="tool-search" type="search" placeholder="¿Qué necesitas calcular hoy?" value={query} onChange={(event) => setQuery(event.target.value)} />
              <kbd>/</kbd>
            </div>
            <div className="category-pills" aria-label="Filtrar herramientas por categoría">
              <button type="button" className={!category ? 'active' : ''} onClick={() => setCategory('')}>Todas</button>
              {['Impuestos', 'Facturación', 'Finanzas'].map((name) => <button type="button" className={category === name ? 'active' : ''} key={name} onClick={() => setCategory(category === name ? '' : name)}>{name}</button>)}
            </div>
            {filtered.length ? <div className="tools-grid">{filtered.map((tool) => <ToolCard key={tool.path} tool={tool} />)}</div> : <div className="no-results"><strong>No encontramos herramientas con esa búsqueda.</strong><button type="button" onClick={() => { setQuery(''); setCategory(''); }}>Ver todas</button></div>}
            <div className="tools-footnote"><ShieldCheck size={16} /> Los resultados son orientativos y se basan en los datos que introduces. <Link to="/aviso-legal/">Conoce sus límites</Link></div>
          </div>
        </section>

        <section className="category-section section">
          <div className="container">
            <div className="section-heading centered"><span className="eyebrow">TODO EN UN MISMO LUGAR</span><h2>Tu actividad tiene muchas facetas.<br /><span>Te ayudamos a organizarlas.</span></h2></div>
            <div className="category-grid">{categories.map((item) => <Link className="category-card" to={item.path} key={item.title}><span className="category-icon">{item.icon}</span><h3>{item.title}</h3><p>{item.description}</p><span className="category-arrow"><ArrowUpRight size={17} /></span></Link>)}</div>
          </div>
        </section>

        <section className="guides-section section">
          <div className="container">
            <div className="section-heading section-heading-row"><div><span className="eyebrow">INFORMACIÓN PARA TU DÍA A DÍA</span><h2>Guías claras para<br /><span>decidir con contexto.</span></h2></div><Link className="text-link" to="/blog/">Ver todas las guías <ArrowRight size={16} /></Link></div>
            <div className="guide-grid">{guidePaths.map((path, index) => <Link className="guide-card" to={path} key={path}><span className={`guide-number guide-color-${index + 1}`}>0{index + 1}</span><div><span className="guide-label">GUÍA PRÁCTICA</span><h3>{pages[path].name}</h3><p>{pages[path].description}</p><span className="guide-read">Leer guía <ArrowUpRight size={15} /></span></div></Link>)}</div>
          </div>
        </section>

        <section className="faq-section section">
          <div className="container faq-layout">
            <div className="faq-intro"><span className="eyebrow">PREGUNTAS FRECUENTES</span><h2>Respuestas<br /><span>sin letra pequeña.</span></h2><p>Si necesitas resolver una duda sobre tu situación concreta, consulta con un profesional o con el organismo correspondiente.</p><Link className="text-link" to="/contacto/">Más información <ArrowRight size={16} /></Link></div>
            <div className="faq-list">{faqs.map(([question, answer]) => <details className="faq-item" key={question}><summary>{question}<span className="faq-plus">+</span></summary><p>{answer}</p></details>)}</div>
          </div>
        </section>
      </main>
    </>
  );
}
