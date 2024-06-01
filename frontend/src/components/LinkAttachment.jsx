import React from 'react';
import PropTypes from 'prop-types';

function LinkAttachment(props) {
  const { link } = props;

  const imageContent = (link.photo)
    ? (
      <div className="post-attachment__image">
        <picture>
          {link.photo.sizes.map((item) =>
            <source key={item.type} src={item.url} />
          )}
          <img className="post-attachment__photo" src={link.photo.sizes[0].url} />
        </picture>
      </div>
    )
    : null;

  return (
    <a className="post-attachment link-attachment" href={link.url}>
      {imageContent}
      <div className="post-attachment__content">
        <h2 className="post-attachment__title">{link.title}</h2>
        <span className="post-attachment__caption">{link.caption}</span>
      </div>
    </a >
  );
}

LinkAttachment.propTypes = {
  link: PropTypes.shape({
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    caption: PropTypes.string,
  }).isRequired,
};

LinkAttachment.defaultProps = {
  link: {
    caption: '',
  },
};

export default LinkAttachment;
