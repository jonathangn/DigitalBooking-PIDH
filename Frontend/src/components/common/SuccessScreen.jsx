import { Link } from 'react-router-dom';
import success from '../../pages/Booking/success-icon.svg';

function SuccessScreen({ title, message, buttonLabel = 'volver' }) {
  return (
    <div className="booking-alternative">
      <div className="booking-success-container">
        <div className="booking-success-card card-booking">
          <img
            src={success}
            className="success-icon"
            alt="Success"
            loading="lazy"
            width="120"
            height="120"
          />
          {title && <h1>{title}</h1>}
          <h3>{message}</h3>
          <Link to="/" className="booking-button">
            {buttonLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SuccessScreen;