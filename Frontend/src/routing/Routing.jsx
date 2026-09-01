import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import SignUp from '../pages/SignUp/SignUp';
import Layout from '../components/Layout/index';
import Product from '../pages/Product/Product';
import Booking from '../pages/Booking/Booking';
import AdminProduct from '../pages/AdminProduct/AdminProduct';
import Reservations from '../pages/Reservations/Reservations';
import NotFound from '../pages/NotFound/NotFound';
import Forbidden from '../pages/Forbidden/Forbidden';
import Guardian from '../components/Guardian/Guardian';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';

function Routing() {
  return (
    <>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <ErrorBoundary>
          <Layout>
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/productos/:id" element={<Product />} />
            <Route
              path="/productos/:id/reserva"
              element={
                <Guardian>
                  <Booking />
                </Guardian>
              }
            />
            <Route
              path="/admin"
              element={
                <Guardian adminOnly>
                  <AdminProduct />
                </Guardian>
              }
            />
            <Route
              path="/reservations"
              element={
                <Guardian>
                  <Reservations />
                </Guardian>
              }
            />
            <Route path="/403" element={<Forbidden />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          </Layout>
        </ErrorBoundary>
      </Router>
    </>
  );
}

export default Routing;
