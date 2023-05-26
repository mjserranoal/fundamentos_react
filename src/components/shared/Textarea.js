import classNames from 'classnames';

import './Textarea.css';

const Textarea = ({ className, ...props }) => {
  return (
    <div className={classNames('textarea', className)}>
      <textarea className="textarea-input" {...props} />
    </div>
  );
};

export default Textarea;
