import axios from "../axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Dispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { RootState, AppDispatch } from '@/state/store';
import {appealFromCommunity, joinCommunity,unjoinCommunity,  setCommunity, setPosts, setAppealed, setLoading, setError, clearCommunity, upvoteFromCommunity, downvoteFromCommunity, undoUpvoteFromCommunity, undoDownvoteFromCommunity, deleteFromCommunity, HideFromCommunity, hideFromCommunity, showFromCommunity } from "@/state/reducers/communitySlice";
import { DOWNVOTE, UNDO_DOWNVOTE, UNDO_UPVOTE, UPVOTE, GET_USER, GET_PROFILE_POSTS, GET_PROFILE_COMMENTS, GET_COMMUNITY, GET_COMMUNITY_POSTS, GET_COMMUNITY_APPEALED, JOIN_COMMUNITY, UNJOIN_COMMUNITY, APPEAL, SHOW, HIDE, DELETE} from "@/constants/Urls";

export const fetchPostComment = (communityId?: string, userId?: string ,pageNoPost?: number, pageNoAppealed?: number) =>  {
    console.log('postid', userId, communityId);
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
            axios.get(GET_COMMUNITY_POSTS,{
                params: {
                    communityId: communityId,
                    userId: userId,
                    pageNo: pageNoPost,
                }
            }),
            axios.get(GET_COMMUNITY_APPEALED,{
                params: {
                    communityId: communityId,
                    userId: userId,
                    pageNo: pageNoAppealed,
                }
            }),
            axios.get(GET_COMMUNITY,{
                params: {
                    id: communityId,
                    // userId: userId,
                    // pageNo: pageNoPost,
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
            dispatch(setAppealed({ appealed: response2.data , hasMorePages}));
          } else {
            // Handle non-200 status codes here (e.g., dispatch error action)
            //console.error("Unexpected status code:", response.status);
            throw new Error(response2?.data?.message || "Error");
          }
          if (response3.status === 200) {
            console.log(response3);
            //const hasMorePages = response2?.data?.length > 0;  
            dispatch(setCommunity({
                id: response3.data.id,
                name: response3.data.name,
                description: response3.data.description,
                moderators: response3.data.moderators,
                members:response3.data.users,
                userId: userId
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

export const fetchComment = (communityId?: string, userId?: string ,page?: number) =>  {
    console.log('postid', userId, communityId, page);
    return async (dispatch) => {
      dispatch(setLoading(true));
      
      try {
        // const response = await axios.get(FEED_PATH,{
        //     params: {
        //         id: userId,
        //         pageNo: page
        //       }
        // });
        const response1= await axios.get(GET_COMMUNITY_APPEALED,{
            params: {
                communityId: communityId,
                userId: userId,
                pageNo: page,
            }
        })  
            if (response1.status === 200) {
                console.log(response1.data);
                const hasMorePages = response1?.data?.length > 0;  
                dispatch(setAppealed({ appealed: response1.data , hasMorePages}));
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

export const fetchPost = (communityId?: string, userId?: string ,page?: number) =>  {
    console.log('postid', userId, communityId, page);
    return async (dispatch) => {
      dispatch(setLoading(true));
      
      try {
        // const response = await axios.get(FEED_PATH,{
        //     params: {
        //         id: userId,
        //         pageNo: page
        //       }
        // });
        const response1=   await axios.get(GET_COMMUNITY_POSTS,{
            params: {
                communityId: communityId,
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

export const upvoteFromCommunityAction= (userId?: string, postId?: string) =>  {

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
            if(response.data) dispatch(upvoteFromCommunity({postId}));
          
        } else {
          throw new Error(response?.data?.message || "Error");
        }
      } catch (error) {
        dispatch(setError(error.message));
      }
    }
};

export const downvoteFromCommunityAction = (userId?: string, postId?: string) =>  {
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
            if(response.data) dispatch(downvoteFromCommunity({postId}));
          
        } else {
          throw new Error(response?.data?.message || "Error");
        }
      } catch (error) {
        dispatch(setError(error.message));
      }
    }
};


export const undoUpvoteFromCommunityAction = (userId?: string, postId?: string) =>  {

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
            if(response.data) dispatch(undoUpvoteFromCommunity({postId}));
          
        } else {
          throw new Error(response?.data?.message || "Error");
        }
      } catch (error) {
        dispatch(setError(error.message));
      }
    }
};

export const undoDownvoteFromCommunityAction = (userId?: string, postId?: string) =>  {

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
            if(response.data) dispatch(undoDownvoteFromCommunity({postId}));
          
        } else {
          throw new Error(response?.data?.message || "Error");
        }
      } catch (error) {
        dispatch(setError(error.message));
      }
    }
};

export const joinCommunityAction = (userId?: string, communityId?: string) =>  {
    return async (dispatch) => {
    //   dispatch(setLoading(true));
    //   console.log('started');
    const formData = new URLSearchParams();
    formData.append("args", communityId);
    formData.append("args", userId);
      try {
        const response = await axios.post(JOIN_COMMUNITY,formData, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          });

        if (response.status === 200) {
            console.log(response.data);
            if(response.data) dispatch(joinCommunity({
                id: response.data.id,
                username: response.data.username,
                email: response.data.email,
                reputation: response.data.reputation,
            }));
          
        } else {
          throw new Error(response?.data?.message || "Error");
        }
      } catch (error) {
        dispatch(setError(error.message));
      }
    }
};

export const unjoinCommunityAction = (userId?: string, communityId?: string) =>  {
    return async (dispatch) => {
    //   dispatch(setLoading(true));
    //   console.log('started');
    const formData = new URLSearchParams();
    formData.append("args", communityId);
    formData.append("args", userId);
      try {
        const response = await axios.post(UNJOIN_COMMUNITY,formData, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          });

        if (response.status === 200 && response) {
            console.log(response.data);
            if(response.data) dispatch(unjoinCommunity({userId}));
          
        } else {
          throw new Error(response?.data?.message || "Error");
        }
      } catch (error) {
        dispatch(setError(error.message));
      }
    }
};

export const deleteFromCommunityAction = (userId?: string, postId?: string) =>  {

  return async (dispatch) => {
  //   dispatch(setLoading(true));
  //   console.log('started');
  const formData = new URLSearchParams();
  formData.append("args", postId);
  formData.append("args", userId);
    try {
      const response = await axios.post(DELETE,formData, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });

      if (response.status === 200) {
          console.log('delete',response.data);
          dispatch(deleteFromCommunity({postId}));
        
      } else {
        throw new Error(response?.data?.message || "Error");
      }
    } catch (error) {
      dispatch(setError(error.message));
    }
  }
};

export const appealFromCommunityAction = (userId?: string, postId?: string) =>  {

  return async (dispatch) => {
  //   dispatch(setLoading(true));
  //   console.log('started');
  const formData = new URLSearchParams();
  formData.append("args", postId);
  formData.append("args", userId);
    try {
      const response = await axios.post(APPEAL,formData, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });

      if (response.status === 200) {
          console.log('appeal',response.data);
          dispatch(appealFromCommunity({postId}));
        
      } else {
        throw new Error(response?.data?.message || "Error");
      }
    } catch (error) {
      dispatch(setError(error.message));
    }
  }
};

export const showFromCommunityAction = (userId?: string, postId?: string) =>  {

  return async (dispatch) => {
  //   dispatch(setLoading(true));
  //   console.log('started');
  const formData = new URLSearchParams();
  formData.append("args", postId);
  formData.append("args", userId);
    try {
      const response = await axios.post(SHOW,formData, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });

      if (response.status === 200) {
          console.log('show',response.data);
          dispatch(showFromCommunity({postId}));
        
      } else {
        throw new Error(response?.data?.message || "Error");
      }
    } catch (error) {
      dispatch(setError(error.message));
    }
  }
};

export const hideFromCommunityAction = (userId?: string, postId?: string) =>  {

  return async (dispatch) => {
  //   dispatch(setLoading(true));
  //   console.log('started');
  const formData = new URLSearchParams();
  formData.append("args", postId);
  formData.append("args", userId);
    try {
      const response = await axios.post(HIDE,formData, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });

      if (response.status === 200) {
          console.log('hide',response.data);
          dispatch(hideFromCommunity({postId}));
        
      } else {
        throw new Error(response?.data?.message || "Error");
      }
    } catch (error) {
      dispatch(setError(error.message));
    }
  }
};