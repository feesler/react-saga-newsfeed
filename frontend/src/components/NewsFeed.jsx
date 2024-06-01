import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { readNews } from '../store/newsFeedSlice.js';
import NewsCard from './NewsCard.jsx';
import LoadMoreButton from './LoadMoreButton.jsx';

function NewsFeed(props) {
  const dispatch = useDispatch();
  const { items, moreAvailable, loading } = useSelector((state) => state.newsFeed);

  const handleClick = () => {
    dispatch(readNews());
  };

  useEffect(() => {
    dispatch(readNews());
  }, []);

  return (
    <div className="feed">
      { items && items.map((item) =>
        <NewsCard key={item.id} item={item} />
      )}
      { moreAvailable && <LoadMoreButton isLoading={loading} onClick={handleClick} />}
    </div>
  );
}

NewsFeed.propTypes = {

};

export default NewsFeed;
