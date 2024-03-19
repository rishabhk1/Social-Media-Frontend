import axios from "../axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Dispatch } from "@reduxjs/toolkit";
import {  setError, setLoading, setName } from "@/state/reducers/createPostSlice";
import { CREATE_POST, GET_COMMUNITY_NAME } from "@/constants/Urls";

export const createPostAction = (communityId: string, title: string, description: string, userId: string) =>  {

    return async (dispatch) => {
      dispatch(setLoading(true));
    //   console.log('started');
    const formData = new URLSearchParams();
    formData.append("args", communityId);
    formData.append("args", title);
    formData.append("args",description);
    formData.append("args",userId);
      try {
        const response = await axios.post(CREATE_POST,formData, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          });

        if (response.status === 200) {
            console.log("post created");
            dispatch(setLoading(false));
        } else {
          throw new Error(response?.data?.message || "Error");
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
              throw new Error(response1?.data?.message || "Error");
          }
    } catch (error) {
      dispatch(setError(error.message));
    }
  }
};