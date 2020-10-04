import api from '../api/backendApi';
import AsyncStorage from '@react-native-community/async-storage';
// import { navigate } from '../RootNavigation';

const signup = ({ email, password }) => async (dispatch) => {
  try {
    const response = await api.post('/signup', { email, password });
    await AsyncStorage.setItem('token', response.data.token);
    dispatch({ type: 'signin', payload: response.data.token });
  } catch (err) {
    dispatch({
      type: 'add_error',
      payload: 'Somthing went wrong with sign up',
    });
  }
};
const signin = ({ email, password }) => async (dispatch) => {
  try {
    const response = await api.post('/signin', { email, password });
    await AsyncStorage.setItem('token', response.data.token);
    dispatch({ type: 'signin', payload: response.data.token });
  } catch (err) {
    dispatch({
      type: 'add_error',
      payload: 'Somthing went wrong with sign in',
    });
  }
};

export { signin, signup };
