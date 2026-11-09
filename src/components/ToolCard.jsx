import { Link } from 'react-router-dom';
import { ArrowUpRight, CalendarDays, ChartNoAxesCombined, Coins, FileText, Percent, Wallet } from 'lucide-react';

const icons = { wallet: Wallet, percent: Percent, chart: ChartNoAxesCombined, coins: Coins, file: FileText, calendar: CalendarDays };

export default function ToolCard({ tool }) {
  const Icon = icons[tool.icon] || FileText;
  return (
    <Link className="tool-card" to={tool.path}>
      <div className={`tool-icon icon-${tool.icon}`}><Icon size={21} strokeWidth={1.8} /></div>
      <span className="tool-category">{tool.category}</span>
      <h3>{tool.title}</h3>
      <p>{tool.description}</p>
      <span className="card-link">Usar herramienta <ArrowUpRight size={16} /></span>
    </Link>
  );
}
