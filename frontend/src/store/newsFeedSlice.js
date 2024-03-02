import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    moreAvailable: true,
    loading: false,
    error: null,
};

const newsFeedSlice = createSlice({
    name: 'newsFeed',
    initialState,
    reducers: {
        readNews: (state) => ({
            ...state,
            loading: true,
            error: null,
        }),
        readNewsSuccess: (state, action) => ({
            ...state,
            loading: false,
            items: [...state.items, ...action.payload],
            moreAvailable: action.payload.length >= 5,
        }),
        readNewsFailure: (state, action) => ({
            ...state,
            loading: false,
            error: action.payload.error,
        }),
    },
});

export const {
    readNews,
    readNewsSuccess,
    readNewsFailure,
} = newsFeedSlice.actions;
export default newsFeedSlice.reducer;
