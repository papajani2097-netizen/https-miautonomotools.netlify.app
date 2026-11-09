import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SEO from './SEO.jsx';
import Breadcrumbs from './Breadcrumbs.jsx';

export default function PageLayout({ path, page, children, className = '' }) {
  return (
    <>
      <SEO title={page.title} description={page.description} path={path} />
      <main className={`page-main ${className}`}>
        <div className="container">
          <Breadcrumbs name={page.name} />
          <header className="page-heading">
            <Link to="/" className="back-link"><ArrowLeft size={15} /> Volver al inicio</Link>
            <span className="eyebrow">MiAutónomoTools</span>
            <h1>{page.name}</h1>
            {page.intro && <p className="page-intro">{page.intro}</p>}
          </header>
          {children}
        </div>
      </main>
    </>
  );
}
