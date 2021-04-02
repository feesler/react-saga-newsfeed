import { put, spawn, retry, takeLatest, select } from 'redux-saga/effects';
import { readNews, readNewsSuccess, readNewsFailure } from '../store/newsFeedSlice';

const newsUrl = process.env.REACT_APP_NEWS_URL;
const getNews = (store) => store.newsFeed.items;

const requestNews = async (lastItemId) => {
  const url = new URL(newsUrl);
  if (lastItemId) {
    url.searchParams.set('lastSeenId', lastItemId);
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
};

function* handleNewsRequest() {
  try {
    const retryCount = Infinity;
    const retryDelay = 3000;
    const items = yield select(getNews);
    let lastItemId;
    if (items.length > 0) {
      const lastItem = items[items.length - 1];
      lastItemId = lastItem.id;
    }

    const data = yield retry(retryCount, retryDelay, requestNews, lastItemId);
    yield put(readNewsSuccess(data));
  } catch (e) {
    yield put(readNewsFailure(e.message));
  }
}

function* watchNewsRequestSaga() {
  yield takeLatest(readNews.match, handleNewsRequest);
}

export default function* saga() {
  yield spawn(watchNewsRequestSaga);
}
