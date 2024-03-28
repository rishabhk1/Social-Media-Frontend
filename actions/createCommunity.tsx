import axios from "../axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Dispatch } from "@reduxjs/toolkit";
import {  setError, setLoading, setName } from "@/state/reducers/createCommunitySlice";
import {fetchName as fetchNamePost} from "@/actions/createPost";
import {fetchName as fetchNameSearch} from "@/actions/search"
import { CREATE_COMMUNITY, GET_COMMUNITY_NAME } from "@/constants/Urls";

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}


export const createCommunityAction = (userId: string, newName: string, description: string) =>  {

    return async (dispatch) => {
      dispatch(setLoading(true));
    //   console.log('started');
    const formData = new URLSearchParams();
    formData.append("args", newName);
    formData.append("args", description);
    formData.append("args",userId);
      try {
        const response = await axios.post(CREATE_COMMUNITY,formData, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          });

        if (response.status === 200) {
            console.log("community created");
            await sleep(1500); // Wait for 5 seconds
            dispatch(fetchNamePost()) // Wait for 2 seconds
            dispatch(fetchNameSearch())
            dispatch(setLoading(false));

        } else {
          throw new Error(response?.data || "Error");
        }
      } catch (error) {
        dispatch(setError(error.message));
      }
    }
};

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