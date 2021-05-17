import { getTotalTokens } from '../hooks/useNFTs';
import { handleActions } from 'redux-actions';

const LOAD = 'nft/LOAD';
const LOAD_SUCCESS = 'nft/LOAD_SUCCESS';
const LOAD_FAILURE = 'nft/LOAD_FAILURE';

const ADD = 'nft/ADD';
const FINDBYOWNER = 'nft/FINDBYOWNER';

export const getNFT = () => async (dispatch) => {
  console.log('get NFT!');
  dispatch({ type: LOAD });
  try {
    const tokens = await getTotalTokens();
    dispatch({
      type: LOAD_SUCCESS,
      payload: tokens,
    });
  } catch (e) {
    dispatch({
      type: LOAD_FAILURE,
      payload: e,
      error: true,
    });
    throw e;
  }
};

const initialState = {
  loading: false,
  nfts: null,
};

const nft = handleActions(
  {
    [LOAD]: (state) => ({
      ...state,
      loading: true,
    }),
    [LOAD_SUCCESS]: (state, action) => ({
      loading: false,
      nfts: action.payload,
    }),
    [LOAD_FAILURE]: (state, action) => ({
      loading: false,
      nfts: action.payload,
    }),
  },
  initialState,
);
export default nft;
