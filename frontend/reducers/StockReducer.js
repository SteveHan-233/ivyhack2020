import { combineReducers } from 'redux';

const StockReducer = (state = [], action) => {
  switch (action.type) {
    case 'add_stock':
      return [...state, action.payload];
    default:
      return state;
  }
};

export default StockReducer;
