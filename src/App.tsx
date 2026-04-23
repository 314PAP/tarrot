import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Reading } from './pages/Reading';
import { Encyclopedia } from './pages/Encyclopedia';

function App() {
  return (
    <Router basename="/tarrot/">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reading" element={<Reading />} />
          <Route path="/encyclopedia" element={<Encyclopedia />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
