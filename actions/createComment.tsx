import axios from "../axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Dispatch } from "@reduxjs/toolkit";
import {  setError, setLoading } from "@/state/reducers/createCommentSlice";
import { CREATE_COMMENT } from "@/constants/Urls";

export const createCommentAction = (parentId: string, content: string, userId: string) =>  {

    return async (dispatch) => {
      dispatch(setLoading(true));
    //   console.log('started');
    const formData = new URLSearchParams();
    formData.append("args", parentId);
    formData.append("args", content);
    formData.append("args",userId);
      try {
        const response = await axios.post(CREATE_COMMENT,formData, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          });

        if (response.status === 200) {
            console.log("comment created");
            dispatch(setLoading(false));
        } else {
          throw new Error(response?.data?.message || "Error");
        }
      } catch (error) {
        dispatch(setError(error.message));
      }
    }
};