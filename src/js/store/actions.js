

// Action Types --------------------------- //

const SET_MEDIA = 'SET_MEDIA';
const SET_LOADING = 'SET_LOADING';








// Action Creators --------------------------- //

export const actionCreators = {
  setLoading: bool => ({type: SET_LOADING, value: bool}),
  setMedia: media => ({type: SET_MEDIA, value: media})
};