import { ofType } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';
import {
  map,
  debounceTime,
  switchMap,
  catchError,
  retryWhen,
  delay,
  take,
  filter,
} from 'rxjs/operators';
import { readNews, readNewsSuccess, readNewsFailure } from '../store/newsFeedSlice';

const newsUrl = process.env.REACT_APP_NEWS_URL;

export const requestNewsEpic = (action$, state$) => action$.pipe(
  filter(o => readNews.match(o)),
  map(o => {
    const items = state$.value.newsFeed.items;
    if (!items.length) {
      return newsUrl;
    }
    const lastItem = items[items.length - 1];
    return `${newsUrl}?lastSeenId=${lastItem.id}`;
  }),
  switchMap(o =>
    ajax.getJSON(o).pipe(
      map(o => readNewsSuccess(o)),
      retryWhen(errors => errors.pipe(delay(3000))),
    )
  )
);
