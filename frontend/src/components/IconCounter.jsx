import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const formatCount = (value) => {
  if (value < 1) {
    return null;
  }

  if (value < 1000) {
    return value.toFixed();
  }

  if (value < 1000000) {
    const thousands = (value % 1000).toFixed();
    return `${thousands}K`;
  }

  const millions = (value % 1000000).toFixed();
  return `${millions}M`;
};

function IconCounter(props) {
  const { icon, count, className } = props;

  if (!icon) {
    return null;
  }

  const IconComponent = icon;
  return (
    <div className={classNames('icon-counter', className)}>
      <IconComponent />
      <span className="icon-counter__count">{formatCount(count)}</span>
    </div>
  );
}

IconCounter.propTypes = {
  icon: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  className: PropTypes.string,
};

IconCounter.defaultProps = {
  className: '',
};

export default IconCounter;
