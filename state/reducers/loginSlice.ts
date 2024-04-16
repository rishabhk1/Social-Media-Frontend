import { createSlice } from "@reduxjs/toolkit";

// interface ModalState {
//     members: boolean,
//     mod: boolean
// }


export interface loginState {
    auth: boolean,
    error: string | null,
    loading: boolean,
    userId: string | null,
  }
  
  const initialState: loginState = {
    auth: false, 
    error: null,
    loading: false,
    userId: null
  };

  export const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {

      // Add a reducer to set an error message
      setUserId(state, action){
        state.userId=action.payload;
      },
      setAuth(state, action){
        state.auth=action.payload;
      },
      setError(state, action) {
        state.error = action.payload;
      },
      clearLogin(state){
        state.error=null;
        state.loading=false;
        state.auth=false;
        state.userId=null;
      },
      setLoading(state, action) {
        state.loading = action.payload;
      },
      // You can add more reducers here for specific actions related to post management
    },
  });
  
  // Export the actions
export const { setUserId,setAuth, setError, clearLogin, setLoading} = loginSlice.actions;


export default loginSlice.reducer;