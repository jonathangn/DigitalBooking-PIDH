import { Field } from 'formik';
import { POLICY_IDS } from '../../constants/policies';

const POLICY_GROUPS = [
  {
    section: 'Generales',
    name: 'CheckIn',
    title: 'Hora check in',
    options: [
      { value: POLICY_IDS.CHECK_IN_9AM, label: '9 am' },
      { value: POLICY_IDS.CHECK_IN_10AM, label: '10 am' },
    ],
  },
  {
    section: 'Generales',
    name: 'CheckOut',
    title: 'Hora check out',
    options: [
      { value: POLICY_IDS.CHECK_OUT_8AM, label: '8 am' },
      { value: POLICY_IDS.CHECK_OUT_9AM, label: '9 am' },
    ],
  },
  {
    section: 'Generales',
    name: 'Covid',
    title: 'Normativa COVID',
    options: [
      { value: POLICY_IDS.COVID_COUNTRY, label: 'País' },
      { value: POLICY_IDS.COVID_WHO, label: 'OMS' },
    ],
  },
  {
    section: 'Generales',
    name: 'Cancel',
    title: 'Costo cancelación',
    options: [
      { value: POLICY_IDS.CANCEL_FREE, label: '$0' },
      { value: POLICY_IDS.CANCEL_50, label: '50%' },
    ],
  },
  {
    section: 'Habitación',
    name: 'Fumar',
    title: '¿Se permite fumar?',
    options: [
      { value: POLICY_IDS.SMOKING_YES, label: 'Si' },
      { value: POLICY_IDS.SMOKING_NO, label: 'No' },
    ],
  },
  {
    section: 'Habitación',
    name: 'Party',
    title: '¿Se permiten fiestas?',
    options: [
      { value: POLICY_IDS.PARTY_YES, label: 'Si' },
      { value: POLICY_IDS.PARTY_NO, label: 'No' },
    ],
  },
  {
    section: 'Habitación',
    name: 'Smoke',
    title: '¿Detector de humo?',
    options: [
      { value: POLICY_IDS.SMOKE_DETECTOR_YES, label: 'Si' },
      { value: POLICY_IDS.SMOKE_DETECTOR_NO, label: 'No' },
    ],
  },
  {
    section: 'Habitación',
    name: 'Safe',
    title: '¿Caja de seguridad?',
    options: [
      { value: POLICY_IDS.SAFE_YES, label: 'Si' },
      { value: POLICY_IDS.SAFE_NO, label: 'No' },
    ],
  },
];

const SECTIONS = ['Generales', 'Habitación'];

function PoliciesSection() {
  return (
    <>
      <h1>Políticas del producto</h1>
      <div className="cards-politics-container">
        {SECTIONS.map((section) => (
          <div key={section} className="cards-politics-setup">
            <h3 className="title-section">{section}</h3>
            <div className="politics-inputs">
              {POLICY_GROUPS.filter((group) => group.section === section).map((group) => (
                <div key={group.name} className="politics-blocks">
                  <h3 className="title-politic">{group.title}</h3>
                  {group.options.map((option) => (
                    <div key={option.value} className="radio">
                      <label className="radio-label">
                        <Field name={group.name} type="radio" value={option.value} />
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default PoliciesSection;