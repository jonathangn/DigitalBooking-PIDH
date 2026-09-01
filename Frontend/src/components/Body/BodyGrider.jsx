import { useContext } from 'react';
import { DataContext } from '../Context/DataContext';
import Glider from 'react-glider';
import 'glider-js/glider.min.css';
import { Api } from '../../Helpers/axiosClient';
import ErrorState from '../ErrorState/ErrorState';

import scrollTo from '../../utils/scrollTo';

function Grider() {
  const { dataReady, categories, categoriesError, retry, setFilter } = useContext(DataContext);

  if (categoriesError) {
    return <ErrorState error={categoriesError} onRetry={() => retry('categories')} />;
  }

  if (!dataReady) {
    return (
      <div className="Loading Data">
        <h3>Cargando Datos</h3>
      </div>
    );
  } else {
    return (
      <div className="grider-container">
        <h2>Buscar por tipo de alojamiento</h2>
        <div className="grider-card">
          <Glider draggable hasDots slidesToShow={'auto'}>
            {categories.map((category) => (
              <div
                key={category.id}
                className="grider-card-item"
                onClick={() => {
                  scrollTo();
                  setFilter(Api + `productos/categoria/${category.id}`);
                }}
              >
                <img
                  src={category.urlImagen}
                  alt={category.titulo}
                  loading="lazy"
                  width="400"
                  height="300"
                />

                <div className="grider-card-details">
                  <h3>{category.titulo}</h3>

                  <p>{category.descripcion}</p>
                </div>
              </div>
            ))}
          </Glider>
        </div>
      </div>
    );
  }
}

export default Grider;
