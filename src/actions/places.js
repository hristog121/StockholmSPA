import database from '../firebase/firebase';

export const addPlace = (place) => ({
    type: 'ADD_PLACE',
    place
});
//push to DB
export const startAddPlace = (placeData = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const {
            position = {},
            title = ''
        } = placeData;

        const place = { position, title};
        return database.ref(`users/${uid}/places`).push(place).then((ref) => {
            dispatch(addPlace({
                id: ref.key,
                ...place
            }));
        });
    };
};

export const removePlace = ({ id }) => ({
    type: 'REMOVE_PLACE',
    id
});
//Remove from DB
export const startRemovePlace = ({ id }) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/places/${id}`).remove().then(() => {
            dispatch(removePlace({ id }));
        });
    };
};

