import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import botonera from "../../funcionesJS/botonera";
import "./Reservations.scss";
import { Context } from "../../context/Context";
import { MdLocationOn } from "react-icons/md";
import swal from "sweetalert";
import axiosClient from "../../Helpers/axiosClient";

function Reservations() {
  const {
    decodedToken,
  } = useContext(Context);

  const navegador = useNavigate();

  function manejadorBotones(evento) {
    navegador(botonera(evento));
  }

  const [hayReserva, setHayReserva] = useState(false);
  const [hayProductos, setHayProductos] = useState(false);
  const [productos, setProductos] = useState();
  const [reserva, setReserva] = useState();

  async function getReserva() {

    axiosClient.get(`reservas/usuario/${decodedToken?.id}`)
      .then(function (response) {
        setReserva(response.data);

        const productosTemp = [];

        response.data.forEach((item) => {
          axiosClient.get(`productos/${item.producto.id}`)
            .then(function (responsePro) {
              productosTemp.push(responsePro.data);

              if (response.data.length !== productosTemp.length) {
                setTimeout(1000);
                setHayProductos(false);
                setHayReserva(false);
              } else {
                setHayProductos(true);
                setHayReserva(true);
                setProductos(productosTemp);
              }
            })
            .catch(function () {});
        });
      })
      .catch(function () {});
  }

  useEffect(() => {
    getReserva();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- deps cover `decodedToken`; getReserva recreated each render
  }, [decodedToken]);

  function eliminarReserva(idReserva) {
    swal({
      title: "¿Está seguro de cancelar su reserva?",
      text: "Se le cobrará el costo de cancelación de acuerdo al producto.",
      icon: "warning",
      buttons: ["Volver", "Cancelar reserva"],
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          
          axiosClient.delete(`reservas/${idReserva}`)
            .then(function () {
              if (productos === undefined || reserva.length === 0) {
                setHayReserva(false);
                setHayProductos(false);
              }
              swal("Tu reserva ha sido cancelada.", {
                icon: "success",
                buttons: false,
              });
              setTimeout(() => {
                window.location.reload();
              }, 1800);

            })
            .catch(function () {});
        }
      });
  }

  if (!hayReserva) {
    return (
      <>
        <div className="header-product">
          <div>
            <h1>Mis reservas</h1>
          </div>
          <Link to="/">
            <IoIosArrowBack />
          </Link>
        </div>
        <div className="reservation">
          <div className="reservation-container">
            <div className="reservation-image-container">
              <div className="reservation-image"></div>
            </div>
            <div className="reservation-text-container">
              <h1>Acá vas a encontrar tus reservas</h1>
              <div className="bottom-text-reservation">
                <h3>
                  Utilizá los filtros del home para encontrar tu estadía ideal.
                </h3>
                <button onClick={() => manejadorBotones()}>Ir al Home</button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="header-product">
          <div>
            <h1>Mis reservas</h1>
          </div>
          <Link to="/">
            <IoIosArrowBack />
          </Link>
        </div>
        <div className="reservas">
          <div className="reservas-container">
            {hayReserva &&
              hayProductos &&
              productos &&
              reserva.length === productos.length &&
              productos.map((p) => {
                let idReserva = reserva.find((item) => item.producto.id === p.id);
                let imagenFrente = p.imagenes.find((item) => item.titulo === "frente1");
                return (
                  <div key={p.id} className="reservas-items-container">
                    <section className="reserva-item">
                      <div className="info-reserva">
                        <div className="text-container-reserva">
                          <h1>{p.nombre}</h1>
                          <div className="location-reserva">
                            <MdLocationOn />
                            <h4>{p.direccion}</h4>
                          </div>
                          {hayReserva &&
                            hayProductos &&
                            reserva &&
                            reserva
                              .filter((r) => r.producto.id === p.id)
                              .map((r) => {
                                return (
                                  <>
                                    <div className="check-reserva">
                                      <h4>Check-in:{r.fechaInicio} | {r.hora}</h4>
                                      <hr />
                                      <h4>Check-out: {r.fechaFinal}</h4>
                                    </div>
                                    <div className="datos-extra-reserva">
                                      <h4>Datos extras:</h4>
                                      <h4>&quot;{r.datosExtra}&quot;</h4>
                                      <h4>
                                        {r.vacunado
                                          ? "Usted indicó que se encuentra vacunado contra el COVID-19"
                                          : "Usted indicó que no se encuentra vacunado contra el COVID-19"}
                                      </h4>
                                    </div>
                                  </>
                                )
                              })
                          }
                          <div className="caracteristicas-reserva">
                            {p.caracteristicas &&
                              p.caracteristicas.map((c) => {
                                return (
                                  <>
                                    <img src={c.icono} alt={c.nombre} />
                                  </>
                                );
                              })}
                          </div>
                        </div>
                        <div className="imagen-container-reserva">
                          <div className="imagen-reserva" style={{ backgroundImage: `url('${imagenFrente.urlImg}')` }}>
                          </div>
                        </div>
                      </div>
                    </section>
                    <div className="btn-reserva-container">
                      <button className="producto">
                        <Link to={`/productos/${p.id}`}>Ver más detalle del producto</Link>
                      </button>
                      <button className="cancelar" onClick={() => eliminarReserva(idReserva.id)}>Cancelar reserva</button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </>
    );
  }
}

export default Reservations;
