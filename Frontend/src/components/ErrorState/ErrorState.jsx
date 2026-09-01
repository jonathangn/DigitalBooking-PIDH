import { AiOutlineCloudServer } from 'react-icons/ai';
import { apiErrorMessage } from '../../api/client';
import './ErrorState.scss';

const DEFAULT_MESSAGE = 'No pudimos cargar la información. Revisá tu conexión e intentá de nuevo.';

function ErrorState({ message, onRetry, error }) {
  const text = message || apiErrorMessage(error) || DEFAULT_MESSAGE;

  return (
    <div className="error-state" role="alert">
      <AiOutlineCloudServer className="error-state__icon" />
      <p className="error-state__message">{text}</p>
      {onRetry && (
        <button type="button" className="error-state__retry" onClick={onRetry}>
          Reintentar
        </button>
      )}
    </div>
  );
}

export default ErrorState;