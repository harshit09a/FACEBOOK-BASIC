import { SEARCH_SUCCESS } from "../actions/actionTypes";

const initialSearchState = {
  results: [],
};

export default function search(state = initialSearchState, action) {
  switch (action.type) {
    case SEARCH_SUCCESS:
        
          return { ...state, results: action.user };
    default:
      return state;
  }
}
