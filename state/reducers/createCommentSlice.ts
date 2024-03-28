import { createSlice } from "@reduxjs/toolkit";

// interface ModalState {
//     members: boolean,
//     mod: boolean
// }



export interface createCommentState {
    error: string | null;
    loading: boolean
  }
  
  const initialState: createCommentState = {
    error: null,
    loading: false
  };

  export const createCommentSlice = createSlice({
    name: "createComment",
    initialState,
    reducers: {

      // Add a reducer to set an error message

      setError(state, action) {
        state.error = action.payload;
      },
      clearCreateComment(state){
        state.error=null;
        state.loading=false;
        
      },
      setLoading(state, action) {
        state.loading = action.payload;
      },
      // You can add more reducers here for specific actions related to post management
    },
  });
  
  // Export the actions
export const {  setError, clearCreateComment, setLoading} = createCommentSlice.actions;


export default createCommentSlice.reducer;