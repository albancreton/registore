import { combineReducers } from 'redux';
import { generateReducerBuilder } from './registore';

export { generateReducerBuilder };
export default generateReducerBuilder(combineReducers);
