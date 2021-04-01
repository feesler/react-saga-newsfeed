import React from 'react';
import PropTypes from 'prop-types';
import { formatTime } from '../utils/DateTimeUtils';
import { decodeXML } from 'entities';
import { ReactComponent as LikesIcon } from '../assets/likes-icon.svg';
import { ReactComponent as CommentsIcon } from '../assets/comments-icon.svg';
import { ReactComponent as RepostsIcon } from '../assets/reposts-icon.svg';
import { ReactComponent as ViewsIcon } from '../assets/views-icon.svg';
import LinkAttachment from './LinkAttachment';
import IconCounter from './IconCounter';

function NewsCard(props) {
  const { item } = props;
  const userName = 'User name';
  const timeFmt = formatTime(item.date * 1000);

  const decodedContent = decodeXML(item.text);

  let linkAttachment = null;
  if (Array.isArray(item.attachments)) {
    const attach = item.attachments.find((attachment) => attachment.type === 'link');
    if (attach) {
      linkAttachment = <LinkAttachment link={attach.link} />;
    }
  }

  return (
    <div className="feed-item post">
      <div className="post__header">
        <div className="post__avatar"></div>
        <div className="post__title">
          <div className="post__user">{userName}</div>
          <div className="post__time">{timeFmt}</div>
        </div>
      </div>
      <p className="post__content">{decodedContent}</p>
      {linkAttachment}
      <div className="post__bottom">
        <IconCounter icon={LikesIcon} count={item.likes.count} />
        <IconCounter icon={CommentsIcon} count={item.comments.count} />
        <IconCounter icon={RepostsIcon} count={item.reposts.count} />
        <IconCounter className="align-right" icon={ViewsIcon} count={item.views.count} />
      </div>
    </div>
  );
};

NewsCard.propTypes = {
  item: PropTypes.object.isRequired,
};

export default NewsCard;
