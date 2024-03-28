import { createSlice } from "@reduxjs/toolkit";

// interface ModalState {
//     members: boolean,
//     mod: boolean
// }

interface CommunityName {
    id: string; // should start with c
    name: string;
  }

export interface createCommunityState {
    communityName: (CommunityName)[];
    error: string | null;
    loading: boolean
  }
  
  const initialState: createCommunityState = {
    communityName: [],
    error: null,
    loading: false
  };

  export const createCommunitySlice = createSlice({
    name: "createCommunity",
    initialState,
    reducers: {

      // Add a reducer to set an error message
      setName(state, action){
        state.communityName=action.payload.name
      },
      setError(state, action) {
        state.error = action.payload;
      },
      clearCreateCommunity(state){
        state.error=null;
        state.loading=false;
        state.communityName=[];
      },
      setLoading(state, action) {
        state.loading = action.payload;
      },
      // You can add more reducers here for specific actions related to post management
    },
  });
  
  // Export the actions
export const { setName, setError, clearCreateCommunity, setLoading} = createCommunitySlice.actions;


export default createCommunitySlice.reducer;