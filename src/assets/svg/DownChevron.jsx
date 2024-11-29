import * as React from 'react';

const DownChevron = (props) => (
  <svg
    viewBox="0 0 24 24"
    className={`down-chevron ${props.isActive === false ? '' : 'up'}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18.646 6.354 12 13 5.354 6.354a1.914 1.914 0 0 0-2.708 2.707l9 9a.5.5 0 0 0 .708 0l9-9a1.914 1.914 0 1 0-2.708-2.707z"
      data-name="Layer 3"
    />
  </svg>
);

export default DownChevron;
