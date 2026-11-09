import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function Breadcrumbs({ name }) {
  return (
    <nav className="breadcrumbs" aria-label="Migas de pan">
      <Link to="/">Inicio</Link>
      <ChevronRight size={14} aria-hidden="true" />
      <span aria-current="page">{name}</span>
    </nav>
  );
}
