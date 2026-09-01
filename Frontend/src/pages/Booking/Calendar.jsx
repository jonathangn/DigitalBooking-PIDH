import { useContext } from 'react';
import { DataContext } from '../../components/Context/DataContext';
import DatePicker, { registerLocale } from 'react-datepicker';
import eachDayOfInterval from 'date-fns/eachDayOfInterval';
import 'react-datepicker/dist/react-datepicker.css';
import parseISO from 'date-fns/parseISO';
import { toast } from 'react-hot-toast';
import es from 'date-fns/locale/es';

registerLocale('es', es);

const Calendar = () => {
  const { productBookings, startDate, endDate, setStartDate, setEndDate } = useContext(DataContext);

  const arrayExcluded = [];
  let exclutions = [];

  const getExcluded = () => {
    productBookings &&
      productBookings.forEach((reservation) => {
        arrayExcluded.push(
          eachDayOfInterval({
            start: parseISO(reservation.fechaInicio),
            end: parseISO(reservation.fechaFinal),
          })
        );
      });

    exclutions = [].concat.apply([], arrayExcluded);
  };

  getExcluded();

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    if (exclutions) {
      if (exclutions.some((date) => start <= date && date <= end)) {
        toast.error('No puedes reservar en esas fechas');
        setStartDate(null);
      } else {
        setEndDate(end);
      }
    } else {
      setEndDate(end);
    }
  };

  return (
    <>
      <div className="react-datepicker-wrapper-prod">
        <div className="datepicker-desktop">
          <div className="react-datepicker-wrapper__picker">
            <DatePicker
              selected={null}
              onChange={onChange}
              startDate={startDate}
              endDate={endDate}
              monthsShown={2}
              selectsRange
              locale={es}
              inline
              dateFormat="dd-MM-yyyy"
              className="react-datepicker-wrapper__picker-input"
              excludeDates={exclutions}
              minDate={new Date()}
            />
          </div>
        </div>
      </div>
      <div className="datepicker-mobile">
        <div className="react-datepicker-wrapper__picker">
          <DatePicker
            selected={null}
            onChange={onChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            locale={es}
            inline
            dateFormat="dd-MM-yyyy"
            className="react-datepicker-wrapper__picker-input"
            excludeDates={exclutions}
            minDate={new Date()}
          />
        </div>
      </div>
    </>
  );
};
export default Calendar;
