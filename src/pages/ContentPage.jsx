import { ExternalLink, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout.jsx';
import { guidePaths, pages } from '../data/site.js';

const officialLinks = {
  agencia: 'https://sede.agenciatributaria.gob.es/',
  seguridadSocial: 'https://portal.seg-social.gob.es/wps/portal/importass/importass'
};

function OfficialLink({ href, children }) {
  return <a href={href} target="_blank" rel="noreferrer">{children} <ExternalLink size={14} aria-hidden="true" /></a>;
}

function GuideContent({ path }) {
  if (path === '/gastos-deducibles-autonomos/') return <>
    <p>La deducibilidad de un gasto depende de las circunstancias de la actividad y de los requisitos fiscales aplicables. No existe una lista que permita decidir todos los casos sin revisar su contexto.</p>
    <h2>Cómo organizar los gastos profesionales</h2><ul><li>Conserva las facturas y justificantes relacionados con tu actividad.</li><li>Anota la fecha, el proveedor, el concepto y el importe para facilitar su revisión.</li><li>Separa los gastos personales de los profesionales y consulta los casos de uso mixto.</li><li>Contrasta el tratamiento fiscal con la Agencia Tributaria o con un asesor.</li></ul>
    <p>Esta guía ofrece pautas de organización, no determina si un gasto concreto es deducible ni sustituye la normativa vigente.</p><p><OfficialLink href={officialLinks.agencia}>Consultar la sede electrónica de la Agencia Tributaria</OfficialLink></p>
    <p><Link to="/calculadora-beneficio-neto/">Usa la calculadora de beneficio neto</Link> para restar los importes que quieras tener en cuenta.</p>
  </>;
  if (path === '/tarifa-plana-autonomos/') return <>
    <p>Las bonificaciones y reducciones de la cuota pueden depender de requisitos, fechas y circunstancias personales. Las condiciones pueden cambiar, por lo que conviene comprobar la información oficial antes de tramitar el alta o hacer previsiones.</p>
    <h2>Qué comprobar antes de solicitar información</h2><ul><li>Los requisitos vigentes y los supuestos que pueden afectar a tu situación.</li><li>Las fechas de alta, plazos y trámites indicados por la Seguridad Social.</li><li>Si tu situación personal o historial de alta cambia las condiciones aplicables.</li><li>Cómo mantener y justificar el cumplimiento de los requisitos.</li></ul>
    <p>No se indican importes ni duración porque pueden variar según la normativa vigente y cada caso.</p><p><OfficialLink href={officialLinks.seguridadSocial}>Consulta Importass, portal de la Tesorería General de la Seguridad Social</OfficialLink></p>
  </>;
  if (path === '/calendario-fiscal/') return <>
    <p>Las fechas de presentación dependen de la obligación, del periodo y de circunstancias particulares. Para evitar publicar un calendario que pueda quedar desactualizado, consulta siempre el calendario oficial del ejercicio que corresponda.</p>
    <h2>Una forma sencilla de organizarte</h2><ul><li>Identifica qué obligaciones pueden corresponder a tu actividad.</li><li>Anota los periodos y fechas que confirme tu asesoría o la fuente oficial.</li><li>Reserva tiempo para reunir facturas, justificantes y datos bancarios.</li><li>Revisa posibles cambios de calendario y días inhábiles en la fuente oficial.</li></ul>
    <p><OfficialLink href={officialLinks.agencia}>Consulta la Agencia Tributaria</OfficialLink> para encontrar información actualizada sobre campañas y plazos.</p>
  </>;
  return <>
    <p>Empezar una actividad por cuenta propia requiere organizar trámites, obligaciones y previsiones. Los pasos concretos dependen de la actividad y de tu situación personal; utiliza las fuentes oficiales para comprobar qué te corresponde.</p>
    <h2>Antes de iniciar la actividad</h2><ul><li>Define la actividad y revisa qué autorizaciones sectoriales podrían ser necesarias.</li><li>Consulta con la Agencia Tributaria las obligaciones censales y fiscales aplicables.</li><li>Revisa con la Seguridad Social el alta en el régimen correspondiente y sus condiciones.</li><li>Prepara un sistema para registrar ingresos, gastos, facturas y justificantes.</li><li>Valora asesorarte con un profesional si tienes dudas sobre tu caso.</li></ul>
    <p>Esta guía es informativa y no constituye una lista completa de trámites ni asesoramiento jurídico o fiscal.</p>
    <p><OfficialLink href={officialLinks.agencia}>Agencia Tributaria</OfficialLink> · <OfficialLink href={officialLinks.seguridadSocial}>Importass - Seguridad Social</OfficialLink></p>
  </>;
}

function BlogContent() {
  return <div className="content-card guide-list-page"><p>Información general para ayudarte a organizar tu actividad. Las condiciones y obligaciones pueden depender de cada caso; consulta las fuentes oficiales y busca asesoramiento cuando lo necesites.</p><div className="guide-list">{guidePaths.map((path) => <Link to={path} key={path}><span className="guide-list-label">GUÍA</span><strong>{pages[path].name}</strong><span>{pages[path].description}</span><span className="guide-read">Leer guía →</span></Link>)}</div></div>;
}

function GeneralContent({ path }) {
  if (path === '/blog/') return <BlogContent />;
  if (path === '/sobre-nosotros/') return <div className="content-card"><p>MiAutónomoTools es un proyecto de herramientas gratuitas para profesionales autónomos en España. Su objetivo es facilitar cálculos sencillos y ofrecer información general para organizar tareas habituales.</p><h2>Un enfoque claro</h2><p>Las calculadoras trabajan con los datos introducidos por cada persona. No verifican tipos, requisitos ni normativa, y sus resultados no constituyen asesoramiento fiscal, contable o jurídico.</p><p>La web no presenta testimonios, valoraciones ni cifras de uso como prueba de calidad. Queremos que cada herramienta explique con claridad qué calcula y cuáles son sus límites.</p></div>;
  if (path === '/contacto/') {
    const email = import.meta.env.VITE_CONTACT_EMAIL;
    return <div className="content-card contact-card"><span className="content-icon"><Mail size={21} /></span><h2>¿Quieres ponerte en contacto?</h2>{email ? <p>Para consultas generales sobre MiAutónomoTools, puedes escribirnos a <a href={`mailto:${email}`}>{email}</a>.</p> : <p>El canal de contacto todavía no está configurado. Si administras el sitio, define la variable <code>VITE_CONTACT_EMAIL</code> para publicar una dirección de correo.</p>}<p>Para dudas sobre obligaciones fiscales o tu situación personal, consulta con un asesor o con el organismo oficial correspondiente.</p></div>;
  }
  if (path === '/politica-de-privacidad/') return <div className="content-card"><p><strong>Información pendiente de revisión antes de publicar:</strong> este texto describe el funcionamiento previsto de la aplicación y debe adaptarse a los servicios de alojamiento, contacto y analítica que finalmente se configuren.</p><h2>Datos introducidos en las herramientas</h2><p>Las calculadoras realizan sus operaciones en el navegador. La aplicación no incorpora un servidor propio ni una cuenta de usuario para guardar los datos que se escriben en sus formularios. No introduzcas información personal o confidencial que no sea necesaria.</p><h2>Comunicaciones y servicios de terceros</h2><p>Si se configura una dirección de contacto, el envío de un correo se realizará mediante el programa o servicio de correo que elijas. La tipografía puede cargarse desde Google Fonts, que recibe las solicitudes técnicas necesarias para servirla. Consulta las políticas del proveedor de alojamiento y de cualquier servicio externo que se habilite.</p><h2>Responsable y consultas</h2><p>Los datos de identificación del titular y un canal de contacto deben añadirse antes de publicar esta política. La configuración final de servicios y el tratamiento efectivo deben revisarse conforme a la normativa aplicable.</p></div>;
  if (path === '/politica-de-cookies/') return <div className="content-card"><p><strong>Información pendiente de revisión antes de publicar:</strong> comprueba el comportamiento del proveedor de alojamiento y de los servicios externos en el sitio desplegado.</p><h2>Cookies y almacenamiento</h2><p>La aplicación no incluye herramientas de analítica ni publicidad y no instala cookies propias para las calculadoras. Los datos se procesan en el navegador y no se guardan en una cuenta. El proveedor de tipografías externas o el alojamiento pueden utilizar tecnologías propias; consulta sus condiciones y verifica el comportamiento real en producción.</p><h2>Cómo gestionar cookies</h2><p>Puedes revisar y eliminar cookies desde los ajustes de tu navegador. Si se incorporan servicios que requieran consentimiento, esta política y los controles del sitio deben actualizarse antes de activarlos.</p></div>;
  return <div className="content-card"><p><strong>Información pendiente de completar por el titular antes de publicar el sitio.</strong></p><h2>Identificación del titular</h2><p>Añade nombre o denominación social, NIF, domicilio, datos registrales cuando correspondan y un medio de contacto. Esta aplicación no inventa esos datos.</p><h2>Condiciones de uso</h2><p>El contenido y las calculadoras se ofrecen con finalidad informativa y de apoyo. Los resultados dependen de las cifras introducidas y no verifican su exactitud, la normativa aplicable ni las obligaciones de cada persona. No constituyen asesoramiento profesional.</p><p>Antes de publicar, completa la información identificativa y revisa estas condiciones con asesoramiento adecuado a tu actividad y jurisdicción.</p></div>;
}

export default function ContentPage({ path }) {
  const page = pages[path];
  return <PageLayout path={path} page={page} className="content-page">{guidePaths.includes(path) ? <article className="content-card guide-content"><GuideContent path={path} /></article> : <GeneralContent path={path} />}</PageLayout>;
}
