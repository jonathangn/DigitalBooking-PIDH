import { Formik, Form, Field, ErrorMessage } from 'formik';
import { DataContext } from '../Context/DataContext';
import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BsCheck2Circle } from 'react-icons/bs';
import { MdLocationOn } from 'react-icons/md';
import Calendar from '../../pages/Booking/Calendar';
import { format } from 'date-fns';
import axiosClient from '../../Helpers/axiosClient';
import Select from 'react-select';
import { Context } from '../../context/Context';
import { normalizeError, apiErrorMessage } from '../../api/client';
import { selectStyles, selectTheme } from '../../styles/selectTheme';
import { ARRIVAL_OPTIONS } from '../../constants/booking';

function BookingForm({ onSuccess }) {
  const { decodedToken } = useContext(Context);
  const { startDate, endDate, productDetail } = useContext(DataContext);
  const { id } = useParams();

  const userId = decodedToken?.id;
  const userName = decodedToken?.nombre;
  const userLastname = decodedToken?.apellido;
  const userEmail = decodedToken?.email;

  const [bookingError, setBookingError] = useState(null);

  const producto = productDetail;
  const gallery = productDetail.imagenes && productDetail.imagenes.sort((a, b) => a.id - b.id);

  return (
    <Formik
      initialValues={{
        name: userName,
        lastname: userLastname,
        email: userEmail,
        city: '',
        hora: '',
        fechaInicio: format(startDate, 'yyyy-MM-dd'),
        fechaFinal: format(endDate, 'yyyy-MM-dd'),
        producto: { id: parseInt(id) },
        usuario: { id: userId },
        vacunado: false,
        datosExtra: '',
      }}
      enableReinitialize
      validate={(values) => {
        let error = {};

        if (!values.name) {
          error.name = 'Por favor, ingresa tu nombre';
        }

        if (!values.lastname) {
          error.lastname = 'Por favor, ingresa tu apellido';
        }

        if (!values.email) {
          error.email = 'Por favor, ingresa un correo electrónico';
        } else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(values.email)) {
          error.email = 'El correo solo puede contener letras, números, puntos y guiones ';
        }

        if (!values.city) {
          error.city = 'Por favor, ingresa la ciudad';
        } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.city)) {
          error.city = 'La ciudad solo puede contener letras';
        }

        if (!values.hora) {
          error.hora = 'Por favor, registra tu hora de llegada';
        }

        return error;
      }}
      onSubmit={(values) => {
        async function postBooking() {
          const data = JSON.stringify({
            hora: values.hora,
            fechaInicio: values.fechaInicio,
            fechaFinal: values.fechaFinal,
            producto: {
              id: parseInt(id),
            },
            usuario: {
              id: decodedToken?.id,
            },
            datosExtra: values.datosExtra,
            vacunado: values.vacunado,
          });

          axiosClient
            .post('reservas', data)
            .then(function () {
              setBookingError(null);
              onSuccess();
            })
            .catch(function (err) {
              setBookingError(apiErrorMessage(normalizeError(err)));
            });
        }
        postBooking();
      }}
    >
      {({ errors, setFieldValue }) => (
        <Form>
          <div className="booking-information">
            <div className="form">
              <section className="form-inputs">
                <div className="card-booking">
                  <div className="inputs-div">
                    <label htmlFor="name">Nombre</label>
                    <Field type="text" id="name" name="name" placeholder="Nombre" disabled />
                    <ErrorMessage
                      name="name"
                      component={() => <div className="error-input">{errors.name}</div>}
                    />
                    <label htmlFor="lastname">Apellido</label>
                    <Field
                      type="text"
                      id="lastname"
                      name="lastname"
                      placeholder="Apellido"
                      disabled
                    />
                    <ErrorMessage
                      name="lastname"
                      component={() => <div className="error-input">{errors.lastname}</div>}
                    />
                  </div>
                  <div className="inputs-div">
                    <label htmlFor="email">Email</label>
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      placeholder="mail@example.com"
                      disabled
                    />
                    <ErrorMessage
                      name="email"
                      component={() => <div className="error-input">{errors.email}</div>}
                    />
                    <label htmlFor="city">Ciudad</label>
                    <Field type="text" id="city" name="city" placeholder="Ciudad" />
                    <ErrorMessage
                      name="city"
                      component={() => <div className="error-input">{errors.city}</div>}
                    />
                  </div>
                </div>
              </section>

              <section className="booking-date">
                <h1>Seleccioná tu fecha de reserva</h1>
                <div className="card-booking">
                  <Calendar />
                </div>
              </section>

              <section className="check-in">
                <h1>Tu horario de llegada</h1>
                <div className="card-booking">
                  <div className="title-check-in">
                    <BsCheck2Circle />
                    <h4>
                      Tu habitación va a estar lista para el check-in entre las 10:00 AM y las
                      11:00 PM.
                    </h4>
                  </div>

                  <h4 className="subtitle-check-in">Indicá tu horario estimado de llegada</h4>

                  <Select
                    name="hora"
                    id="hora"
                    required
                    styles={selectStyles}
                    defaultValue={{
                      value: '',
                      label: 'Seleccionar una hora de llegada',
                    }}
                    onChange={(e) => setFieldValue('hora', e.value)}
                    options={ARRIVAL_OPTIONS}
                    theme={selectTheme}
                  />
                  <ErrorMessage
                    name="hora"
                    component={() => <div className="error-input">{errors.hora}</div>}
                  />
                </div>
              </section>
            </div>

            <section className="booking-details">
              <div className="card-booking">
                <h1 className="title-booking-details">Detalle de la reserva</h1>

                <div className="content-booking-details">
                  <div className="image-container">
                    <div
                      className="image"
                      style={{ backgroundImage: `url(${gallery && gallery[0].urlImg})` }}
                    ></div>
                  </div>

                  <div className="bottom-booking-details">
                    <h4 className="category-title">
                      {producto.categoria?.titulo.toUpperCase()}
                    </h4>
                    <h1>{producto.nombre}</h1>

                    <div className="location-booking-details">
                      <div style={{ alignSelf: 'flex-start' }}>
                        <MdLocationOn />
                      </div>
                      <div className="direccion">
                        <h4 style={{ marginTop: '-4px', marginLeft: '4px' }}>
                          {producto.direccion}
                        </h4>
                      </div>
                    </div>

                    <div className="check-in-booking-details">
                      <hr className="hr-booking" />
                      <div className="check-in-check-out">
                        <h4>Check in </h4>
                        <h4 className="datesBooking">
                          {format(startDate, 'yyyy/MM/dd')}
                        </h4>
                      </div>
                      <hr className="hr-booking" />
                      <div className="check-in-check-out">
                        <h4>Check out </h4>
                        <h4 className="datesBooking">{format(endDate, 'yyyy/MM/dd')}</h4>
                      </div>
                      <hr className="hr-booking" />
                      <div className="textarea-booking">
                        <Field
                          name="datosExtra"
                          placeholder="Datos adicionales para el vendedor"
                          as="textarea"
                        />
                      </div>
                      <div className="checkbox-booking">
                        <label className="container">
                          Estoy vacunado contra el COVID-19
                          <Field type="checkbox" name="vacunado" />
                          <span className="checkmark"></span>
                        </label>
                      </div>
                      <button type="sumbit">Confirmar reserva</button>
                      {bookingError && (
                        <div className="error-input">{bookingError}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <p className="success-submit"></p>
        </Form>
      )}
    </Formik>
  );
}

export default BookingForm;