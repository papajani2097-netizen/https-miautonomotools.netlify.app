import { Helmet } from 'react-helmet-async';
import { siteName, siteUrl } from '../data/site.js';

export default function SEO({ title, description, path, noIndex = false }) {
  const canonical = `${siteUrl}${path}`;
  return (
    <Helmet>
      <title>{`${title} | ${siteName}`}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="es_ES" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={`${title} | ${siteName}`} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      {noIndex && <meta name="robots" content="noindex,follow" />}
    </Helmet>
  );
}
