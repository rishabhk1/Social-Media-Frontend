import axios from "../axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Dispatch } from "@reduxjs/toolkit";
import {  setName, setError } from "@/state/reducers/searchSlice";
import { GET_COMMUNITY_NAME } from "@/constants/Urls";

export const fetchName = () =>  {
    return async (dispatch) => {
    //   dispatch(setLoading(true));
      
      try {
        const response1= await axios.get(GET_COMMUNITY_NAME)        
            if (response1.status === 200) {
                console.log(response1.data); 
                dispatch(setName({ name: response1.data.name}));
              } else {
                // Handle non-200 status codes here (e.g., dispatch error action)
                //console.error("Unexpected status code:", response.status);
                throw new Error(response1?.data || "Error");
            }
      } catch (error) {
        dispatch(setError(error.message));
      }
    }
};