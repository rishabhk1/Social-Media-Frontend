import axios from "../axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Dispatch } from "@reduxjs/toolkit";
import {  setTargetUser, setPosts, setComments, setLoading, setError, clearProfile, upvoteFromProfile, downvoteFromProfile, undoUpvoteFromProfile, undoDownvoteFromProfile } from "@/state/reducers/profileSlice";
import { DOWNVOTE, UNDO_DOWNVOTE, UNDO_UPVOTE, UPVOTE, GET_USER, GET_PROFILE_POSTS, GET_PROFILE_COMMENTS} from "@/constants/Urls";

export const fetchPostComment = (targetUserId?: string, userId?: string ,pageNoPost?: number, pageNoComment?: number) =>  {
    console.log('postid', userId, targetUserId);
    return async (dispatch) => {
      dispatch(setLoading(true));
      
      try {
        // const response = await axios.get(FEED_PATH,{
        //     params: {
        //         id: userId,
        //         pageNo: page
        //       }
        // });
        const [response1, response2, response3] = await Promise.all([
            axios.get(GET_PROFILE_POSTS,{
                params: {
                    targetId: targetUserId,
                    userId: userId,
                    pageNo: pageNoPost,
                }
            }),
            axios.get(GET_PROFILE_COMMENTS,{
                params: {
                    targetId: targetUserId,
                    userId: userId,
                    pageNo: pageNoComment,
                }
            }),
            axios.get(GET_USER,{
                params: {
                    id: targetUserId,
                }
            }),
          ]);
        
        if (response1.status === 200) {
          console.log(response1.data);
          const hasMorePages = response1?.data?.length > 0;  
          dispatch(setPosts({ posts: response1.data, hasMorePages }));
        } else {
          // Handle non-200 status codes here (e.g., dispatch error action)
          //console.error("Unexpected status code:", response.status);
          throw new Error(response1?.data?.message || "Error");
        }
        if (response2.status === 200) {
            console.log(response2.data);
            const hasMorePages = response2?.data?.length > 0;  
            dispatch(setComments({ comments: response2.data , hasMorePages}));
          } else {
            // Handle non-200 status codes here (e.g., dispatch error action)
            //console.error("Unexpected status code:", response.status);
            throw new Error(response2?.data?.message || "Error");
          }
          if (response3.status === 200) {
            console.log(response3);
            //const hasMorePages = response2?.data?.length > 0;  
            dispatch(setTargetUser({
                id: response3.data.id,
                username: response3.data.username,
                email: response3.data.email,
                reputation: response3.data.reputation,
            }));
          } else {
            // Handle non-200 status codes here (e.g., dispatch error action)
            //console.error("Unexpected status code:", response.status);
            throw new Error(response3?.data?.message || "Error");
          }
      } catch (error) {
        dispatch(setError(error.message));
      } finally {
        dispatch(setLoading(false));
      }
    }
};

export const fetchComment = (targetUserId?: string, userId?: string ,page?: number) =>  {
    console.log('postid', userId, targetUserId, page);
    return async (dispatch) => {
      dispatch(setLoading(true));
      
      try {
        // const response = await axios.get(FEED_PATH,{
        //     params: {
        //         id: userId,
        //         pageNo: page
        //       }
        // });
        const response1= await axios.get(GET_PROFILE_COMMENTS,{
            params: {
                targetId: targetUserId,
                userId: userId,
                pageNo: page,
            }
        })  
            if (response1.status === 200) {
                console.log(response1.data);
                const hasMorePages = response1?.data?.length > 0;  
                dispatch(setComments({ comments: response1.data , hasMorePages}));
              } else {
                // Handle non-200 status codes here (e.g., dispatch error action)
                //console.error("Unexpected status code:", response.status);
                throw new Error(response1?.data?.message || "Error");
            }
      } catch (error) {
        dispatch(setError(error.message));
      } finally {
        dispatch(setLoading(false));
      }
    }
};

export const fetchPost = (targetUserId?: string, userId?: string ,page?: number) =>  {
    console.log('postid', userId, targetUserId, page);
    return async (dispatch) => {
      dispatch(setLoading(true));
      
      try {
        // const response = await axios.get(FEED_PATH,{
        //     params: {
        //         id: userId,
        //         pageNo: page
        //       }
        // });
        const response1=   await axios.get(GET_PROFILE_POSTS,{
            params: {
                targetId: targetUserId,
                userId: userId,
                pageNo: page,
            }
        })      
            if (response1.status === 200) {
                console.log(response1.data);
                const hasMorePages = response1?.data?.length > 0;  
                dispatch(setPosts({ posts: response1.data , hasMorePages}));
              } else {
                // Handle non-200 status codes here (e.g., dispatch error action)
                //console.error("Unexpected status code:", response.status);
                throw new Error(response1?.data?.message || "Error");
            }
      } catch (error) {
        dispatch(setError(error.message));
      } finally {
        dispatch(setLoading(false));
      }
    }
};

export const upvoteFromProfileAction= (userId?: string, postId?: string) =>  {

    return async (dispatch) => {
    //   dispatch(setLoading(true));
      console.log(userId, postId);
    const formData = new URLSearchParams();
    formData.append("args", postId);
    formData.append("args", userId);
    console.log(formData);
      try {
        const response = await axios.post(UPVOTE,formData, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          });

        if (response.status === 200) {
            console.log(response.data);
            if(response.data) dispatch(upvoteFromProfile({postId}));
          
        } else {
          throw new Error(response?.data?.message || "Error");
        }
      } catch (error) {
        dispatch(setError(error.message));
      }
    }
};

export const downvoteFromProfileAction = (userId?: string, postId?: string) =>  {

    return async (dispatch) => {
    //   dispatch(setLoading(true));
    //   console.log('started');
    const formData = new URLSearchParams();
    formData.append("args", postId);
    formData.append("args", userId);
      try {
        const response = await axios.post(DOWNVOTE,formData, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          });

        if (response.status === 200) {
            console.log(response.data);
            if(response.data) dispatch(downvoteFromProfile({postId}));
          
        } else {
          throw new Error(response?.data?.message || "Error");
        }
      } catch (error) {
        dispatch(setError(error.message));
      }
    }
};


export const undoUpvoteFromProfileAction = (userId?: string, postId?: string) =>  {

    return async (dispatch) => {
    //   dispatch(setLoading(true));
    //   console.log('started');
    const formData = new URLSearchParams();
    formData.append("args", postId);
    formData.append("args", userId);
      try {
        const response = await axios.post(UNDO_UPVOTE,formData, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          });

        if (response.status === 200) {
            console.log(response.data);
            console.log(postId);
            if(response.data) dispatch(undoUpvoteFromProfile({postId}));
          
        } else {
          throw new Error(response?.data?.message || "Error");
        }
      } catch (error) {
        dispatch(setError(error.message));
      }
    }
};

export const undoDownvoteFromProfileAction = (userId?: string, postId?: string) =>  {

    return async (dispatch) => {
    //   dispatch(setLoading(true));
    //   console.log('started');
    const formData = new URLSearchParams();
    formData.append("args", postId);
    formData.append("args", userId);
      try {
        const response = await axios.post(UNDO_DOWNVOTE,formData, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          });

        if (response.status === 200) {
            console.log(response.data);
            if(response.data) dispatch(undoDownvoteFromProfile({postId}));
          
        } else {
          throw new Error(response?.data?.message || "Error");
        }
      } catch (error) {
        dispatch(setError(error.message));
      }
    }
};