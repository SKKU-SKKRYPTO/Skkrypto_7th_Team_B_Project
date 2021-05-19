import { combineReducers } from 'redux';
import loading from './loading';
import nft from './nft';

const rootReducer = combineReducers({
  nft,
  loading,
});

export default rootReducer;
