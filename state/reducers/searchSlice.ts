import { createSlice } from "@reduxjs/toolkit";

// interface ModalState {
//     members: boolean,
//     mod: boolean
// }


interface CommunityName {
    id: string; // should start with c
    name: string;
  }

export interface SearchState {
    communityName: (CommunityName)[];
    error: string | null;
  }
  
  const initialState: SearchState = {
    communityName: [],
    error: null,
  };

  export const searchSlice = createSlice({
    name: "search",
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
        state.communityName=[];
        state.error=null;
      },

      // You can add more reducers here for specific actions related to post management
    },
  });
  
  // Export the actions
export const { setName, setError, clearSearch} = searchSlice.actions;


export default searchSlice.reducer;