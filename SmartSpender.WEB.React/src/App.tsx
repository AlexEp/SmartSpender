import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container, ThemeProvider, CssBaseline, GlobalStyles } from '@mui/material';
import Header from './components/Header';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import About from './pages/About';
import Business from './pages/Business';
import Category from './pages/Category';
import BusinessCategoryComparison from './pages/BusinessCategoryComparison';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          body: {
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
          },
          '#root': {
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
          },
        }}
      />
      <Router>
        <Header />
        <Navbar />
        <Container sx={{ mt: 4, mb: 10 }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/admin" element={<Admin />}>
              <Route path="" element={<Navigate to="business" replace />} />
              <Route path="business" element={<Business />} />
              <Route path="category" element={<Category />} />
              <Route path="business-category-comparison" element={<BusinessCategoryComparison />} />
            </Route>
          </Routes>
        </Container>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
