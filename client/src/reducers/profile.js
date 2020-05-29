import { GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE } from '../actions/types';

const initialState = {
  profile: null,
  profiles: [],
  loading: true,
  repo: null,
  error: {},
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
        profile: null,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        loading: false,
        profile: null,
        repo: [],
      };
    default:
      return state;
  }
};
