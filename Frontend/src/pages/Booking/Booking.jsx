import { useState, useContext } from 'react';
import { DataContext } from '../../components/Context/DataContext';
import { Link, useParams } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import BookingForm from '../../components/Booking/BookingForm';
import SuccessScreen from '../../components/common/SuccessScreen';

import './Booking.scss';

function Booking() {
  const { id } = useParams();

  const { setIdProduct, productDetail } = useContext(DataContext);
  setIdProduct(id);

  const [bookingOk, setBookingOk] = useState(false);

  const producto = productDetail;

  if (!productDetail || !productDetail.id) {
    return (
      <div className="loading-data">
        <h3>Cargando...</h3>
      </div>
    );
  }

  if (bookingOk) {
    return (
      <SuccessScreen
        title="¡Muchas gracias!"
        message="Su reserva se ha realizado con éxito"
        buttonLabel="ok"
      />
    );
  }

  return (
    <>
      <div className="booking">
        <div className="header-product">
          <div>
            <h4>{producto.categoria?.titulo.toUpperCase()}</h4>
            <h1>{producto.nombre}</h1>
          </div>
          <Link to="/">
            <IoIosArrowBack />
          </Link>
        </div>

        <h1 className="title-form">Completá tus datos</h1>
        <BookingForm onSuccess={() => setBookingOk(true)} />
      </div>

      <div className="politics-product">
        <div className="politics-title">
          <h1>Qué tenés que saber</h1>
          <hr />
        </div>
        <div className="politics-grid-container">
          <div className="politics-items">
            <h3> Normas de la casa</h3>
            {producto.politicas
              ?.filter((politica) => politica.tipo === 'NORMAS')
              .map((politica, index) => {
                return <div key={index}>{politica.descripcion}</div>;
              })}
          </div>
          <div className="politics-items">
            <h3> Salud y seguridad</h3>
            {producto.politicas
              ?.filter((politica) => politica.tipo === 'SEGURIDAD')
              .map((politica, index) => {
                return <div key={index}>{politica.descripcion}</div>;
              })}
          </div>
          <div className="politics-items">
            <h3> Política de cancelación</h3>
            {producto.politicas
              ?.filter((politica) => politica.tipo === 'CANCELACION')
              .map((politica, index) => {
                return <div key={index}>{politica.descripcion}</div>;
              })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Booking;