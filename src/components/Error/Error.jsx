import { ErrorSVG } from '@/assets/svg';

import './Error.css';

export default function Error({ message = 'Bir Hata Oluştu' }) {
  return (
    <div className="error-wrapper">
      <ErrorSVG />

      <div>
        <h2>{message}</h2>
      </div>
    </div>
  );
}
