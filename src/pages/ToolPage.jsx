import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout.jsx';
import { pages, tools } from '../data/site.js';
import { InvoiceGenerator, IrpfCalculator, NetProfitCalculator, QuarterlyCalculator, QuotaCalculator, VatCalculator } from '../components/Calculators.jsx';

const calculators = {
  '/calculadora-cuota-autonomos/': QuotaCalculator,
  '/calculadora-iva/': VatCalculator,
  '/calculadora-irpf/': IrpfCalculator,
  '/calculadora-beneficio-neto/': NetProfitCalculator,
  '/generador-facturas/': InvoiceGenerator,
  '/calculadora-impuestos-trimestrales/': QuarterlyCalculator
};

export default function ToolPage({ path }) {
  const page = pages[path];
  const Calculator = calculators[path];
  const related = tools.filter((tool) => tool.path !== path).slice(0, 3);
  return (
    <PageLayout path={path} page={page} className="tool-page">
      <Calculator />
      <aside className="notice-box"><strong>Importante:</strong> las herramientas no sustituyen asesoramiento profesional ni verifican la normativa aplicable. Contrasta los datos y requisitos en fuentes oficiales.</aside>
      {path !== '/generador-facturas/' && <section className="related-tools"><div className="related-heading"><h2>También puede interesarte</h2><Link to="/blog/">Ver guías <span aria-hidden="true">→</span></Link></div><div className="related-links">{related.map((tool) => <Link key={tool.path} to={tool.path}>{tool.title}<span aria-hidden="true">↗</span></Link>)}</div></section>}
    </PageLayout>
  );
}
