import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Manhattan from './pages/Manhattan'
import Nest from './pages/Nest'
import PalmCity from './pages/PalmCity'
import Projects from './pages/Projects'
import SahuCity from './pages/SahuCity'
import Serenity from './pages/Serenity'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/manhattan" element={<Manhattan />} />
        <Route path="/nest" element={<Nest />} />
        <Route path="/palm-city" element={<PalmCity />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/sahucity" element={<SahuCity />} />
        <Route path="/serenity" element={<Serenity />} />
      </Route>
    </Routes>
  )
}

export default App