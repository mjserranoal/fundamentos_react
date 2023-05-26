import classNames from 'classnames';

import './FormField.css';
import { useRef } from 'react';
import { useEffect } from 'react';

const FormField = ({ className, autofocus, label, ...props }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (autofocus) {
      inputRef.current.focus();
    }
  }, [autofocus]);

  return (
    <div className={classNames('formField', className)}>
      <label className="formField-label">
        <span>{label}</span>
        <input
          ref={inputRef}
          className="formField-input"
          autoComplete="off"
          {...props}
        />
      </label>
    </div>
  );
};

export default FormField;
