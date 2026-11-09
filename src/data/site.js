import pages from './seo-pages.json';

export const siteName = 'MiAutónomoTools';
export const siteUrl = (import.meta.env.VITE_SITE_URL || 'https://miautonomotools.es').replace(/\/+$/, '');

export const tools = [
  { title: 'Calculadora de Cuota de Autónomos', description: 'Organiza y anualiza la cuota mensual que introduzcas.', path: '/calculadora-cuota-autonomos/', category: 'Finanzas', icon: 'wallet' },
  { title: 'Calculadora de IVA', description: 'Calcula la cuota de IVA a partir de una base y un tipo indicado.', path: '/calculadora-iva/', category: 'Impuestos', icon: 'percent' },
  { title: 'Calculadora de IRPF', description: 'Estima una retención usando el porcentaje que indiques.', path: '/calculadora-irpf/', category: 'Impuestos', icon: 'chart' },
  { title: 'Calculadora de Beneficio Neto', description: 'Resta gastos y costes introducidos a tus ingresos.', path: '/calculadora-beneficio-neto/', category: 'Finanzas', icon: 'coins' },
  { title: 'Generador de Facturas', description: 'Prepara e imprime una factura con los datos que proporciones.', path: '/generador-facturas/', category: 'Facturación', icon: 'file' },
  { title: 'Calculadora de Impuestos Trimestrales', description: 'Agrupa cifras trimestrales introducidas por ti.', path: '/calculadora-impuestos-trimestrales/', category: 'Impuestos', icon: 'calendar' }
];

export { pages };

export const guidePaths = [
  '/gastos-deducibles-autonomos/',
  '/tarifa-plana-autonomos/',
  '/calendario-fiscal/',
  '/como-ser-autonomo/'
];
