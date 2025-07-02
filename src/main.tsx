import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import AOS from 'aos'
import 'aos/dist/aos.css'

AOS.init({
  duration: 900,
  once: true,
  easing: 'ease-in-out',
})

createRoot(document.getElementById("root")!).render(<App />);
