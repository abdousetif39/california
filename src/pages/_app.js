// src/pages/_app.js
import '../styles/globals.css'; // تأكد أن هذا السطر موجود في القمة

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}