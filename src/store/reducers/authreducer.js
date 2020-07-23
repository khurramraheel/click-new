import store from "../store";
import utilities from '../../utilities';

let initialState = {
  UserSignUp: { data: {} },
  cartInfo: [],
  checkout: {}
};

let historyControl = null;

const authReducer = (state = initialState, action) => {
  let newState = JSON.parse(JSON.stringify(state));

  if (action.type == "UserSignUp") {
    newState.UserSignUp.data = action.payload;
    newState.UserSignUp.data = true;
    return newState;
  }
  if (action.type === "ORDER_CONFIRMED") {
    return { ...state, cartInfo: [] };
  }
  if (action.type == "USER_LOGIN_SUCCESS") {
    newState.UserSignUp.data = action.payload;
    newState.UserSignUp.data.inProcess = false;
    return newState;
  } else if (action.type == "USER_LOGIN_FAILED") {
    newState.UserSignUp.data = { failed: true };
    utilities.say("invalid \login details");
    alert("Invalid email or password");
    // newState.inProcess = false;
    return newState;
  } else if (action.type == "USER_LOGIN_STARTED") {
    newState.inProcess = true;
    return newState;
  } else if (action.type == "USER_LOGIN_DONE") {
    // newState.inProcess = false;
    return newState;
  } else if (action.type == "Add_To_Cart") {
    let items;

    // if (state.cartInfo.find(item => item._id === action.payload._id)) {
    //   items = state.cartInfo.map(item => {
    //     if (item._id === action.payload._id) {
    //       ++item.quantity;
    //     }
    //     return item;
    //   });
    //   return { ...state, cartInfo: [...items] };

     
    // }
    action.payload.quantity = 1;
    return { ...state, cartInfo: [...state.cartInfo, action.payload] };
    // newState.inProcess = false;
  } else if (action.type == "USER_CHECKOUT") {
    newState.checkout = action.payload;
    // newState.inProcess = false;
    return newState;
  } else if (action.type == "USER_LOGOUT") {
    historyControl = action.history;
    fetch("/logout").then((req, res) => {
      setTimeout(() => {
        store.dispatch({
          type: "USER_LOGOUT_SUCCESS"
        });
      }, 10);
    });
    return newState;
  } else if (action.type == "USER_LOGOUT_SUCCESS") {
    newState.UserSignUp.data = {};
    localStorage.clear();
    setTimeout(() => {
      historyControl.push("/");
    }, 0);
    localStorage.clear();
    return newState;
  }
  return state;
};

export default authReducer;
