import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, useFormikContext } from 'formik';
import Select from 'react-select';
import { getToken } from '../../Helpers/auth';
import { normalizeError, apiErrorMessage } from '../../api/client';
import { createProductWithImages } from '../../api/products';
import { selectStyles, selectTheme } from '../../styles/selectTheme';
import { validateProductForm, buildProductPayload } from './productFormUtils';
import ImageInputs from './ImageInputs';
import FeaturesSection from './FeaturesSection';
import PoliciesSection from './PoliciesSection';
import ErrorState from '../ErrorState/ErrorState';

function BasicFields({
  categoryOptions,
  cityOptions,
  categoriesError,
  citiesError,
  onGetCategories,
  onGetCities,
}) {
  const { errors, setFieldValue } = useFormikContext();
  return (
    <>
      <div className="inputs-container">
        <div className="input-div-admin">
          <label htmlFor="name">Nombre de la propiedad</label>
          <Field type="text" className="input-admin" placeholder="Hotel Las Palmas" name="nombre" />
          <ErrorMessage
            name="nombre"
            component={() => <div className="error-message">{errors.nombre}</div>}
          />
        </div>

        <div className="input-div-admin">
          <label htmlFor="category">Categoría</label>
          <Select
            name="categoria"
            id="categoria"
            required
            styles={selectStyles}
            defaultValue={{
              value: '',
              label: 'Seleccionar una categoría',
            }}
            onChange={(e) => setFieldValue('categoria', e.id)}
            options={categoryOptions}
            theme={selectTheme}
          />
          <ErrorMessage
            name="categoria"
            component={() => <div className="error-message">{errors.categoria}</div>}
          />
          {categoriesError && (
            <div className="error-message">
              No pudimos cargar las categorías.
              <button type="button" onClick={onGetCategories}>
                Reintentar
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="inputs-container">
        <div className="input-div-admin">
          <label htmlFor="direction">Dirección</label>
          <Field type="text" className="input-admin" name="direccion" />
          <ErrorMessage
            name="direccion"
            component={() => <div className="error-message">{errors.direccion}</div>}
          />
        </div>
        <div className="input-div-admin">
          <label htmlFor="city">Ciudad</label>
          <Select
            name="ciudad"
            id="ciudad"
            required
            styles={selectStyles}
            defaultValue={{
              value: '',
              label: 'Seleccionar una ciudad',
            }}
            onChange={(e) => setFieldValue('ciudad', e.id)}
            options={cityOptions}
            theme={selectTheme}
          />
          <ErrorMessage
            name="ciudad"
            component={() => <div className="error-message">{errors.ciudad}</div>}
          />
          {citiesError && (
            <div className="error-message">
              No pudimos cargar las ciudades.
              <button type="button" onClick={onGetCities}>
                Reintentar
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="inputs-container">
        <div className="input-div-admin">
          <label htmlFor="direction">Latitud</label>
          <Field type="tel" className="input-admin" name="latitud" />
          <ErrorMessage
            name="latitud"
            component={() => <div className="error-message">{errors.latitud}</div>}
          />
        </div>
        <div className="input-div-admin">
          <label htmlFor="longitud">Longitud</label>
          <Field type="text" className="input-admin" name="longitud" />
          <ErrorMessage
            name="longitud"
            component={() => <div className="error-message">{errors.longitud}</div>}
          />
        </div>
      </div>
    </>
  );
}

function ProductForm({
  categoryOptions,
  cityOptions,
  categoriesError,
  citiesError,
  onGetCategories,
  onGetCities,
  onSuccess,
}) {
  const [inputs, setInputs] = useState([{ urlImg: '' }]);
  const [creationError, setCreationError] = useState(null);
  const [imageError, setImageError] = useState(null);

  const handleInputsChange = (e, i) => {
    const { name, value } = e.target;
    const array = [...inputs];
    array[i][name] = value;
    setInputs(array);
  };

  const handleQuit = (i) => {
    const array = [...inputs];
    array.splice(i, 1);
    setInputs(array);
  };

  const handleAdd = () => {
    setInputs([...inputs, { urlImg: '' }]);
  };

  const handleSubmit = (valores) => {
    const payload = buildProductPayload(valores);
    const imageUrls = inputs.map((item) => item.urlImg.trim());

    createProductWithImages(payload, imageUrls, getToken())
      .then(() => {
        setCreationError(null);
        setImageError(null);
        onSuccess();
      })
      .catch((error) => {
        if (error.imagesFailed) {
          setImageError(
            'No se pudieron cargar todas las imágenes. Verificá las URLs e intentá de nuevo.'
          );
          setCreationError(null);
        } else {
          setImageError(null);
          setCreationError(normalizeError(error));
        }
      });
  };

  return (
    <Formik
      initialValues={{
        nombre: '',
        direccion: '',
        latitud: '',
        longitud: '',
        descripcion: '',
        ciudad: '',
        categoria: '',
        caracteristicas: [],
        CheckIn: '',
        CheckOut: '',
        Covid: '',
        Cancel: '',
        Fumar: '',
        Party: '',
        Smoke: '',
        Safe: '',
        urlImg: [],
      }}
      validate={(valores) => validateProductForm(valores, inputs)}
      onSubmit={handleSubmit}
    >
      {({ errors }) => (
        <Form className="admin-form">
          <div className="input-container-admin">
            <BasicFields
              categoryOptions={categoryOptions}
              cityOptions={cityOptions}
              categoriesError={categoriesError}
              citiesError={citiesError}
              onGetCategories={onGetCategories}
              onGetCities={onGetCities}
            />
          </div>
          <label htmlFor="descripcion">Descripción</label>
          <Field name="descripcion" placeholder="   Escribe aquí" as="textarea" />
          <ErrorMessage
            name="descripcion"
            component={() => <div className="error-message">{errors.descripcion}</div>}
          />
          <FeaturesSection />
          <ErrorMessage
            name="caracteristicas"
            component={() => <div className="error-message">{errors.caracteristicas}</div>}
          />
          <PoliciesSection />
          <ErrorMessage
            name="CheckIn"
            component={() => <div className="error-message">{errors.CheckIn}</div>}
          />
          <h1>Cargar imágenes</h1>
          <ImageInputs
            inputs={inputs}
            onChange={handleInputsChange}
            onAdd={handleAdd}
            onRemove={handleQuit}
          />
          <ErrorMessage
            name="urlImg"
            component={() => <div className="error-message">{errors.urlImg}</div>}
          />
          {imageError && <div className="error-message">{imageError}</div>}
          {creationError && (
            <ErrorState error={creationError} message={apiErrorMessage(creationError)} />
          )}
          <div className="btn-admin">
            <button type="submit">Crear</button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default ProductForm;
