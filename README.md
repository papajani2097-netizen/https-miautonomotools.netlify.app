# MiAutónomoTools

Aplicación web en React y Vite con herramientas gratuitas e informativas para autónomos en España.

## Desarrollo

1. Instala Node.js y npm.
2. Ejecuta `npm install`.
3. Copia `.env.example` a `.env` y configura el dominio público en `VITE_SITE_URL`.
4. Ejecuta `npm run dev` para iniciar el servidor local.
5. Ejecuta `npm run build` para generar la web estática en `dist/`.

El build genera `sitemap.xml` y `robots.txt` con el dominio configurado. Si no se configura `VITE_SITE_URL`, se utiliza `https://miautonomotools.es`.

`VITE_CONTACT_EMAIL` es opcional; al configurarla se muestra el enlace de correo en la página de contacto y el pie de página.

## Publicación en Netlify

1. Importa el repositorio en Netlify. El archivo `netlify.toml` configura `npm run build`, la carpeta `dist/` y Node.js 20.
2. En **Site configuration → Environment variables**, añade `VITE_SITE_URL` con la URL pública final del sitio, por ejemplo `https://tu-sitio.netlify.app` o tu dominio propio. No incluyas una barra final.
3. Si quieres mostrar un correo de contacto, añade también `VITE_CONTACT_EMAIL`.
4. Despliega de nuevo después de configurar las variables para regenerar los canonical, el sitemap y las páginas SEO.

El build genera rutas prerenderizadas, `404.html`, `sitemap.xml` y `robots.txt`. Netlify sirve automáticamente `404.html` como página no encontrada.

## Antes de publicar

- Configura el dominio real y comprueba las URL canónicas, el sitemap y el archivo de robots generado.
- Completa los datos de identificación del titular y revisa las páginas legales y de privacidad con la información real de alojamiento y servicios externos.
- Comprueba la aplicabilidad de las reglas fiscales y de facturación por separado. Las herramientas solo realizan operaciones con los datos introducidos; no determinan obligaciones ni sustituyen asesoramiento profesional.
