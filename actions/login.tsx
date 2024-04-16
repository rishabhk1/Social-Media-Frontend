import axios from "../axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Dispatch } from "@reduxjs/toolkit";
import {  setError, setLoading, setAuth, setUserId } from "@/state/reducers/loginSlice";
import { LOGIN, user_id } from "@/constants/Urls";
import { fetchPosts } from "./feed";
import { clearFeed } from "@/state/reducers/feedSlice";
import AsyncStorage from '@react-native-async-storage/async-storage';


const storeData = async (key, value) => {
  try {
     await AsyncStorage.setItem(key, value);
  } catch (error) {
     // Error saving data
     console.error(error);
  }
 };

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const loginAction = (username: string, password: string) =>  {

    return async (dispatch) => {
      dispatch(setLoading(true));
    //   console.log('started');
    const formData = new URLSearchParams();
    formData.append("args", username);
    formData.append("args", password);
      try {
        const response = await axios.post(LOGIN,formData, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          });

        if (response.status === 200) {
            //console.log("post created");
            console.log(response.data.token);
            storeData("userId", response.data.userId);
            storeData("token", response.data.token);
            dispatch(setUserId(response.data.userId));
            dispatch(setAuth(true));
            dispatch(setLoading(false));
        } else {
          throw new Error(response?.data || "Error");
        }
      } catch (error) {
        dispatch(setError(error.message));
      }
    }
};
