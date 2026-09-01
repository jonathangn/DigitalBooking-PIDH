import './Loader.scss';

function Loader() {
  return (
    <div className="loading-data" role="status" aria-live="polite">
      <div className="loader-spinner" aria-hidden="true" />
      <h3>Cargando datos...</h3>
    </div>
  );
}

export default Loader;
