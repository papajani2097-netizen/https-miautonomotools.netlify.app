# GitHub aur Netlify par upload karne ka tareeqa

## GitHub par source code

`MiAutonomoTools-GitHub-Source.zip` download karke apne computer par extract karein. Extract ki hui files ko GitHub ke naye repository mein upload karein. ZIP file ko GitHub par upload karne se website ka source khud-ba-khud install nahin hota; pehle archive extract karna zaroori hai.

## GitHub ko Netlify se connect karke automatic deploy

1. Netlify mein **Add new site → Import an existing project → GitHub** chunein.
2. Apna repository select karein. `netlify.toml` build command `npm run build` aur publish folder `dist` pehle se set karta hai.
3. Site settings ke **Environment variables** mein `VITE_SITE_URL` ko apni public website URL dein, misal: `https://aapki-site.netlify.app`. Domain mein tabdeeli ke baad naya deploy karein, taa-ke canonical links aur sitemap update ho jayen.
4. Har GitHub push par Netlify site ko dobara build aur deploy karega.

## Netlify par seedha upload

`MiAutonomoTools-Netlify-Deploy.zip` ko Netlify ke manual deploy/drop area mein drag karein. Is archive mein built website ke `dist` files hain, source code nahin. Manual upload mein domain badalne ke baad sahi canonical URL aur sitemap ke liye public domain set karke dobara build aur upload karein.

## Contact email

Agar website par contact email dikhana ho, Netlify environment variable `VITE_CONTACT_EMAIL` add karke dobara deploy karein.

Source ZIP mein `.env` ya credentials shamil nahin hain. `.env.example` sirf misaali configuration file hai.
