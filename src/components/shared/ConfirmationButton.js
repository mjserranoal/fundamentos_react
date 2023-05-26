import { useState } from 'react';
import T from 'prop-types';
import Button from './Button';

function ConfirmationButton({ confirmation, onConfirm, ...props }) {
  const [confirmationVisible, setConfirmationVisible] = useState(false);

  const showConfirmation = () => setConfirmationVisible(true);
  const hideConfirmation = () => setConfirmationVisible(false);

  const handleClick = showConfirmation;
  const handleConfirmClick = () => {
    hideConfirmation();
    onConfirm();
  };

  const handleCancelClick = hideConfirmation;
  return (
    <>
      <Button onClick={handleClick} {...props}></Button>
      {confirmationVisible && (
        <div className='confirmation-div'>
          <p>{confirmation}</p>
          <Button onClick={handleConfirmClick}>Ok</Button>
          <Button onClick={handleCancelClick}>Cancel</Button>
        </div>
      )}
    </>
  );
}

ConfirmationButton.propTypes = {
  confirmation: T.node,
  onConfirm: T.func.isRequired,
};

ConfirmationButton.defaultProps = {
  confirmation: null,
};

export default ConfirmationButton;
