import { useEffect, useState } from 'react';
import { Api } from '../../Helpers/axiosClient';
import { fetchJson } from '../../Helpers/fetchJson';
import { Link } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import './AdminProduct.scss';
import ProductForm from '../../components/admin/ProductForm';
import SuccessScreen from '../../components/common/SuccessScreen';
import { normalizeError } from '../../api/client';

function AdminProduct() {
  const [newBooking, setNewBooking] = useState(false);

  const [categories, setCategories] = useState([]);
  const [categoriesError, setCategoriesError] = useState(null);

  const getCategories = async () => {
    try {
      const data = await fetchJson(Api + 'categorias');
      setCategories(data);
      setCategoriesError(null);
    } catch (error) {
      setCategoriesError(normalizeError(error));
    }
  };

  const categoryOptions = categories?.map((c) => ({
    label: c.titulo,
    value: c.titulo,
    id: c.id,
  }));

  const [cities, setCities] = useState([]);
  const [citiesError, setCitiesError] = useState(null);

  const getCities = async () => {
    try {
      const data = await fetchJson(Api + 'ubicaciones');
      setCities(data);
      setCitiesError(null);
    } catch (error) {
      setCitiesError(normalizeError(error));
    }
  };

  const cityOptions = cities?.map((c) => ({
    label: c.ciudad,
    value: c.ciudad,
    id: c.id,
  }));

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- async fetch, state set after await
    getCities();
    getCategories();
  }, []);

  if (newBooking) {
    return <SuccessScreen message="Tu propiedad se ha creado con éxito." />;
  }

  return (
    <>
      <div className="header-product">
        <div>
          <h1>Administración</h1>
        </div>
        <Link to="/">
          <IoIosArrowBack />
        </Link>
      </div>

      <div className="admin-product-container">
        <h1 className="title-form">Crear propiedad</h1>
        <div className="form-container">
          <ProductForm
            categoryOptions={categoryOptions}
            cityOptions={cityOptions}
            categoriesError={categoriesError}
            citiesError={citiesError}
            onGetCategories={getCategories}
            onGetCities={getCities}
            onSuccess={() => setNewBooking(true)}
          />
        </div>
      </div>
    </>
  );
}

export default AdminProduct;