import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, GlobalStyles } from '@mui/material';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import About from './pages/About';
import Business from './pages/Business';
import Category from './pages/Category';
import BusinessCategoryComparison from './pages/BusinessCategoryComparison';
import theme from './theme';
import MainLayout from './components/layout/MainLayout';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles
        styles={{
          body: {
            backgroundColor: theme.palette.background.default,
          },
        }}
      />
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="about" element={<About />} />
            <Route path="admin" element={<Admin />}>
              {/* Admin Layout or Nested Routes can go here. 
                   If Admin page has its own outlet or if these are simple nested routes. 
                   Checking current Admin implementation: it has an Outlet? No, looking at previous App.tsx lines 115-120:
                   <Route path="/admin" element={<Admin />}>
                      <Route path="" element={<Business />} /> ...
                   </Route>
                   This implies Admin component renders an Outlet.
               */}
              <Route index element={<Business />} />
              <Route path="business" element={<Business />} />
              <Route path="category" element={<Category />} />
              <Route path="business-category-comparison" element={<BusinessCategoryComparison />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
