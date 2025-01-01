const initialState = {
    token: null,
  };
  
  const SET_USER = 'SET_USER';
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_USER:
        return { ...state, token: action.payload.token };
      default:
        return state;
    }
  };
  
  export const setUser = (user) => ({
    type: SET_USER,
    payload: user,
  });
  
  export default authReducer;
  