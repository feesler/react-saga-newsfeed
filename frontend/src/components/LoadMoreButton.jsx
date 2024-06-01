import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function LoadMoreButton(props) {
  const { isLoading, onClick } = props;

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      className={classNames('feed-item load-more-btn', { 'loading': isLoading })}
      onClick={handleClick}
    >
      <span className="btn-title">к предыдущим записям</span>
      <div className="loading-animation">
        <div className="circle" />
        <div className="circle" />
        <div className="circle" />
      </div>
    </button>
  );
}

LoadMoreButton.propTypes = {
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
};

LoadMoreButton.defaultProps = {
  isLoading: false,
  onClick: null,
};

export default LoadMoreButton;
