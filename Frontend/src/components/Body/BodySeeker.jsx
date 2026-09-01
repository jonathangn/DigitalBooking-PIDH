import { useContext, useState } from 'react';
import { DataContext } from '../Context/DataContext';
import dateFormat from 'dateformat';
import Select from 'react-select';
import { Api } from '../../Helpers/axiosClient';
import DatePicker, { registerLocale } from 'react-datepicker';
import es from 'date-fns/locale/es';
import 'react-datepicker/dist/react-datepicker.css';
import { IoLocationSharp } from 'react-icons/io5';
import swal from 'sweetalert';
import scrollTo from '../../utils/scrollTo';

registerLocale('es', es);

const Seeker = () => {
  const [value, setValue] = useState(null);
  const cities = useContext(DataContext);
  const filter = useContext(DataContext);

  const dateRange = useContext(DataContext);
  const startDate = dateRange.startDate;
  const endDate = dateRange.endDate;

  const startDates = useContext(DataContext);
  const endDates = useContext(DataContext);

  startDates.startDates && startDates.startDates.sort();
  endDates.endDates && endDates.endDates.sort();

  function handleChange(e) {
    setValue(e);
  }

  function handleOnClick() {
    let dateOne = dateFormat(dateRange.startDate, 'isoDate');
    let dateTwo = dateFormat(dateRange.endDate, 'isoDate');
    if (value !== null && dateRange.startDate !== null && dateRange.endDate !== null) {
      scrollTo();
      filter.setFilter(
        Api + `productos/ubicacion/${value.id}/fechainicial/${dateOne}/fechafinal/${dateTwo}`
      );
    } else if (value === null && dateRange.startDate !== null && dateRange.endDate !== null) {
      swal({
        text: 'Seleccione una ubicación',
        icon: 'warning',
        button: '¡Entendido!',
      });
    } else if (value !== null && dateRange.startDate === null && dateRange.endDate === null) {
      scrollTo();
      filter.setFilter(Api + `productos/ubicacion/${value.id}`);
      setValue((e) => {
        e.label = 'Todas las ubicaciones';
      });
      handleChange(null);
    } else if (value !== null && dateRange.startDate !== null && dateRange.endDate === null) {
      swal({
        text: 'Seleccione una fecha de salida',
        icon: 'warning',
        button: '¡Entendido!',
      });
    } else {
      filter.setFilter(Api + `productos`); //REFRESH FILTER
    }
  }

  const options = cities.cities.map((c) => ({
    id: c.id,
    label: '  ' + c.ciudad,
    value: c.ciudad,
  }));

  const formatOptionLabel = ({ options, label }) => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div>{options}</div>
      <div style={{ marginLeft: '5px', color: 'hsl(0, 0%, 50%)' }}>
        <IoLocationSharp /> {label}
      </div>
    </div>
  );

  return (
    <div className="seeker-container">
      <h1>Busca ofertas en hoteles, casas y mucho más</h1>
      <p></p>
      <div className="seeker-select">
        <Select
          formatOptionLabel={formatOptionLabel}
          options={options}
          onChange={handleChange}
          placeholder={'🔍 ¿A dónde vamos?'}
          className="seeker-item"
          Value={value}
          isClearable={true}
        />

        <div className="seeker-picker css-b62m3t-container">
          <DatePicker
            startDate={startDate}
            endDate={endDate}
            format="yyyy-MM-dd"
            onChange={(update) => {
              dateRange.setDateRange(update);
            }}
            selectsRange={true}
            dateFormat="dd-MM-yyyy"
            minDate={new Date()}
            isClearable={true}
            monthsShown={2}
            placeholderText={'📅 Check in - Check out'}
            locale="es"
            className="input-level seeker-item"
          />
        </div>
        <div className="">
          <button onClick={handleOnClick} className="seeker-button" type="button">
            Buscar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Seeker;
