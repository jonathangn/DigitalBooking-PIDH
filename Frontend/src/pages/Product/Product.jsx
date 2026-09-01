import { useState, useEffect } from 'react';
import {
  IoIosArrowBack,
} from 'react-icons/io';
import { MdLocationOn } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import PickerP from './PickerP';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axiosClient from '../../Helpers/axiosClient';
import ErrorState from '../../components/ErrorState/ErrorState';
import { normalizeError } from '../../api/client';
import ShareModal from '../../components/product/ShareModal';
import Gallery from '../../components/product/Gallery';

import './Product.scss';
import './Product.css';

function Product() {
  const { id } = useParams();
  const [producto, setProducto] = useState({});
  const [loading, setLoading] = useState(true);
  const [productError, setProductError] = useState(null);
  const coords = [producto?.latitud, producto?.longitud];

  async function getProducto() {
    setProductError(null);
    try {
      const result = await axiosClient.get(`productos/${id}`);
      setProducto(result.data);
    } catch (err) {
      setProductError(normalizeError(err));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- async fetch, state set after await
    getProducto();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- fetch on mount; read `id` via getProducto
  }, []);

  if (loading) {
    return (
      <div className="loading-data">
        <h3>Cargando...</h3>
      </div>
    );
  }

  if (productError) {
    return <ErrorState error={productError} onRetry={getProducto} />;
  }

  return (
    <>
      <div className="header-product">
        <div>
          <h4>{producto.categoria?.titulo.toUpperCase()}</h4>
          <h1>{producto.nombre}</h1>
        </div>
        <Link to="/">
          <IoIosArrowBack />
        </Link>
      </div>

      <div className="location-product">
        <div className="location-content">
          <div>
            <MdLocationOn />
          </div>
          <div>
            <h4>
              {producto.ubicacion?.ciudad}, {producto.ubicacion?.pais}
            </h4>
          </div>
        </div>
        <div className="score"></div>
      </div>

      <ShareModal />

      <Gallery images={producto.imagenes} />

      <div className="description-product">
        <h1>{producto.titulo}</h1>
        <p>{producto.descripcion}</p>
      </div>

      <div className="characteristics-product">
        <div className="charactetistics-title">
          <h1>¿Qué ofrece este lugar?</h1>
          <hr />
        </div>
        <div className="characteristics-grid-container">
          {producto.caracteristicas?.map((caracteristica, index) => {
            return (
              <div key={index}>
                <img
                  src={caracteristica.icono}
                  alt={'icono-' + caracteristica.nombre}
                  loading="lazy"
                  width="32"
                  height="32"
                />
                {caracteristica.nombre.replace('-', ' ')}
              </div>
            );
          })}
        </div>
      </div>
      <div className="characteristics-product wrapper-calendar">
        <div className="charactetistics-title wrapper-calendar-title">
          <h1>Fechas disponibles</h1>
          <br />
          <br />
        </div>
        <PickerP />
      </div>

      <div className="map-product">
        <div className="map-title">
          <h1>¿Dónde vas a estar? </h1>
          <hr />
          <div className="map-ubication-text">
            {producto.ubicacion?.ciudad}, {producto.ubicacion?.pais}
          </div>
          <div className="map-wrap">
            {producto?.latitud && producto?.longitud && (
              <MapContainer
                style={{ height: '100%', width: '100%' }}
                center={coords}
                zoom={15}
                scrollWheelZoom={false}
              >
                <TileLayer
                  attribution='&copy;<ahref="http://osm.org/copyright">OpenStreetMap </a> contributors'
                  url="https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"
                />
                <Marker position={coords}>
                  <Popup>{producto?.direccion}</Popup>
                </Marker>
              </MapContainer>
            )}
          </div>
        </div>
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

export default Product;