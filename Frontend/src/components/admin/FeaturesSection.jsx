import { Field } from 'formik';
import { FEATURE_IDS } from '../../constants/policies';

const FEATURES = [
  { id: FEATURE_IDS.AIRE_ACONDICIONADO, label: 'Aire acondicionado' },
  { id: FEATURE_IDS.APTO_MASCOTAS, label: 'Apto mascotas' },
  { id: FEATURE_IDS.CALEFACCION, label: 'Calefacción' },
  { id: FEATURE_IDS.BODEGA, label: 'Bodega' },
  { id: FEATURE_IDS.COCINA, label: 'Cocina' },
  { id: FEATURE_IDS.ESTACIONAMIENTO, label: 'Estacionamiento' },
  { id: FEATURE_IDS.GIMNASIO, label: 'Gimnasio' },
  { id: FEATURE_IDS.TELEVISOR, label: 'Televisor' },
  { id: FEATURE_IDS.PILETA, label: 'Pileta' },
  { id: FEATURE_IDS.WIFI, label: 'Wifi' },
];

function FeaturesSection() {
  return (
    <>
      <h1>Agregar atributos</h1>
      <div className="checkbox-container">
        {FEATURES.map((feature) => (
          <div key={feature.id}>
            <label className="container">
              {feature.label}
              <Field type="checkbox" name="caracteristicas" value={feature.id} />
              <span className="checkmark"></span>
            </label>
          </div>
        ))}
      </div>
    </>
  );
}

export default FeaturesSection;