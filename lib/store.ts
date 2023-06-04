import { createStore, action, thunk } from 'easy-peasy';

export const store = createStore({
    activeSongs: [],
    activeSong: null,
    changeActiveSongs: action((state: any, payload) => {
        state.activeSongs = payload;
    }),
    changeActiveSong: action((state: any, payload) => {
        state.activeSong = payload;
    }),
    // Thunk for Saving To History
    saveToHistory: thunk(async (actions, payload) => {
        fetch(`${window.location.origin}/api/history`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        }).then((res) => {
            if (res.status > 399 && res.status < 200) {
                throw new Error();
            }
            return res.json();
        });
    }),
});
