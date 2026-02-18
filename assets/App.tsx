import { BrowserRouter as Router, Route, Routes } from 'react-router';

import Header    from './partials/Header';
import Footer from './partials/Footer';
import DelayRouter from './partials/DelayRouter';

import Home from './pages/HomePage/Home';
import About from './pages/AboutPage/About';
import News from './pages/NewsPage/News';
import Post from './pages/NewsPage/Post';
import Product from './pages/ProductPage/Product';
import Contact from './pages/ContactPage/Contact';
import NotFound from './pages/NotFoundPage/NotFound';


function App() {

  return (
    <>
      <Router>
        <header className="header">
          <Header />
        </header>
        <main className="main">
          <DelayRouter delay={500}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/news" element={<News />} />
              <Route path="/news/:id" element={<Post />} />
              <Route path="/product" element={<Product />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
              <Route />
            </Routes>
          </DelayRouter>
        </main>
        <footer className="footer">
          <Footer />
        </footer>
      </Router>
    </>
  );
}

export default App;
