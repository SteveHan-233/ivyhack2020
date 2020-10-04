import api from "../api/backendApi";
import AsyncStorage from "@react-native-community/async-storage";
import { navigate } from "../RootNavigation";

const signup = ({ email, password }) => async (dispatch) => {
  try {
    const response = await api.post("/signup", { email, password });
    await AsyncStorage.setItem("token", response.data.token);
    await AsyncStorage.setItem("username", email);
    dispatch({ type: "signin", payload: response.data.token, username: email });
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: "Somthing went wrong with sign up",
    });
  }
};
const signin = ({ email, password }) => async (dispatch) => {
  try {
    const response = await api.post("/signin", { email, password });
    await AsyncStorage.setItem("token", response.data.token);
    await AsyncStorage.setItem("username", email);
    await AsyncStorage.setItem("pfp", response.data.pfp);
    dispatch({
      type: "signin",
      payload: response.data.token,
      username: email,
      pfp: response.data.pfp,
    });
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: "Somthing went wrong with sign in",
    });
  }
};

const tryLocalSignin = () => async (dispatch) => {
  const token = await AsyncStorage.getItem("token");
  const username = await AsyncStorage.getItem("username");
  const pfp = await AsyncStorage.getItem("pfp");
  if (token) {
    dispatch({ type: "signin", payload: token, username, pfp });
  } else {
    navigate("Login");
  }
};

export { signin, signup, tryLocalSignin };
