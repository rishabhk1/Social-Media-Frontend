import { createSlice } from "@reduxjs/toolkit";

// interface ModalState {
//     members: boolean,
//     mod: boolean
// }


interface CommunityName {
  id: string; // should start with c
  name: string;
}

export interface createPostState {
  communityName: (CommunityName)[];
    error: string | null;
    loading: boolean
  }
  
  const initialState: createPostState = {
    communityName: [],
    error: null,
    loading: false
  };

  export const createPostSlice = createSlice({
    name: "createPost",
    initialState,
    reducers: {

      // Add a reducer to set an error message
      setName(state, action){
        state.communityName=action.payload.name
      },
      setError(state, action) {
        state.error = action.payload;
      },
      clearSearch(state){
        state.error=null;
      },
      setLoading(state, action) {
        state.loading = action.payload;
      },
      // You can add more reducers here for specific actions related to post management
    },
  });
  
  // Export the actions
export const { setName, setError, clearSearch, setLoading} = createPostSlice.actions;


export default createPostSlice.reducer;