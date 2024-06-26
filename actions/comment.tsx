import axios from "../axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Dispatch } from "@reduxjs/toolkit";
import { appealFromComment, setPost, setComments, setLoading, setError, clearComments, upvoteFromComment, downvoteFromComment, undoUpvoteFromComment, undoDownvoteFromComment, deleteFromComment } from "@/state/reducers/commentSlice";
import { DOWNVOTE, COMMENT_FEED, UNDO_DOWNVOTE, UNDO_UPVOTE, UPVOTE, GET_POST, GET_COMMENT, APPEAL, DELETE } from "@/constants/Urls";

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const fetchPostComment = (userId?: string, postId?: string ,page?: number) =>  {
    console.log('postid', userId, postId, page);
    return async (dispatch) => {
      dispatch(setLoading(true));
      
      try {
        // const response = await axios.get(FEED_PATH,{
        //     params: {
        //         id: userId,
        //         pageNo: page
        //       }
        // });
        const [response1, response2] = await Promise.all([
            axios.get(GET_COMMENT,{
                params: {
                    id: postId,
                    userId: userId
                }
            }),
            axios.get(COMMENT_FEED,{
                params: {
                    parentId: postId,
                    pageNo: page,
                    userId: userId
                }
            }),
          ]);
        
        if (response1.status === 200) {
          console.log(response1.data);
          //const hasMorePages = response?.data?.length > 0;  
          dispatch(setPost({ posts: response1.data }));
        } else {
          // Handle non-200 status codes here (e.g., dispatch error action)
          //console.error("Unexpected status code:", response.status);
          throw new Error(response1?.data || "Error");
        }
        if (response2.status === 200) {
            console.log(response2.data);
            const hasMorePages = response2?.data?.length > 0;  
            dispatch(setComments({ posts: response2.data , hasMorePages}));
          } else {
            // Handle non-200 status codes here (e.g., dispatch error action)
            //console.error("Unexpected status code:", response.status);
            throw new Error(response2?.data || "Error");
          }
      } catch (error) {
        dispatch(setError(error.message));
      } finally {
        dispatch(setLoading(false));
      }
    }
};

export const fetchComment = (userId?: string, postId?: string ,page?: number) =>  {
    console.log('postid', userId, postId, page);
    return async (dispatch) => {
      dispatch(setLoading(true));
      
      try {
        // const response = await axios.get(FEED_PATH,{
        //     params: {
        //         id: userId,
        //         pageNo: page
        //       }
        // });
        const response1= await axios.get(COMMENT_FEED,{
                params: {
                    parentId: postId,
                    pageNo: page,
                    userId: userId
                }
            })        
            if (response1.status === 200) {
                console.log(response1.data);
                const hasMorePages = response1?.data?.length > 0;  
                dispatch(setComments({ posts: response1.data , hasMorePages}));
              } else {
                // Handle non-200 status codes here (e.g., dispatch error action)
                //console.error("Unexpected status code:", response.status);
                throw new Error(response1?.data || "Error");
            }
      } catch (error) {
        dispatch(setError(error.message));
      } finally {
        dispatch(setLoading(false));
      }
    }
};

export const upvoteFromCommentAction= (userId?: string, postId?: string) =>  {

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
            if(response.data) dispatch(upvoteFromComment({postId}));
          
        } else {
          throw new Error(response?.data || "Error");
        }
      } catch (error) {
        dispatch(setError(error.message));
      }
    }
};

export const downvoteFromCommentAction = (userId?: string, postId?: string) =>  {

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
            if(response.data) dispatch(downvoteFromComment({postId}));
          
        } else {
          throw new Error(response?.data || "Error");
        }
      } catch (error) {
        dispatch(setError(error.message));
      }
    }
};


export const undoUpvoteFromCommentAction = (userId?: string, postId?: string) =>  {

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
            if(response.data) dispatch(undoUpvoteFromComment({postId}));
          
        } else {
          throw new Error(response?.data || "Error");
        }
      } catch (error) {
        dispatch(setError(error.message));
      }
    }
};

export const undoDownvoteFromCommentAction = (userId?: string, postId?: string) =>  {

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
            if(response.data) dispatch(undoDownvoteFromComment({postId}));
          
        } else {
          throw new Error(response?.data || "Error");
        }
      } catch (error) {
        dispatch(setError(error.message));
      }
    }
};

export const deleteFromCommentAction = (userId?: string, postId?: string) =>  {

  return async (dispatch) => {
    dispatch(setLoading(true));
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
          dispatch(deleteFromComment({postId}));
          await sleep(1500);
        
      } else {
        throw new Error(response?.data || "Error");
      }
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  }
};

export const appealFromCommentAction = (userId?: string, postId?: string) =>  {

  return async (dispatch) => {
    dispatch(setLoading(true));
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
          dispatch(appealFromComment({postId}));
          await sleep(1500);
        
      } else {
        throw new Error(response?.data || "Error");
      }
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  }
};
