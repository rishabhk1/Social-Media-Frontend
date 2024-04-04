import axios from "../axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Dispatch } from "@reduxjs/toolkit";
import { appealFromFeed, setPosts, setLoading, setError, PostsState, upvoteFromFeed, undoDownvoteFromFeed, undoUpvoteFromFeed, downvoteFromFeed, deleteFromFeed } from "@/state/reducers/feedSlice";
import { APPEAL, DELETE, DOWNVOTE, FEED_PATH, UNDO_DOWNVOTE, UNDO_UPVOTE, UPVOTE, user_id } from "@/constants/Urls";

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const fetchPosts = (userId?: string, page?: number) =>  {
    return async (dispatch) => {
      dispatch(setLoading(true));
      console.log('started');
      try {
        const response = await axios.get(FEED_PATH,{
            params: {
                id: user_id,
                pageNo: page
              }
        });
        
        if (response.status === 200) {
        console.log(response.data);
          const hasMorePages = response?.data?.length > 0;  
          dispatch(setPosts({ posts: response.data, hasMorePages }));
        } else {
          // Handle non-200 status codes here (e.g., dispatch error action)
          //console.error("Unexpected status code:", response.status);
          throw new Error(response?.data || "Error");
        }
      } catch (error) {
        dispatch(setError(error.message));
      } finally {
        dispatch(setLoading(false));
      }
    }
};

export const upvoteFromFeedAction = (userId?: string, postId?: string) =>  {

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
            if(response.data) dispatch(upvoteFromFeed({postId}));
          
        } else {
          throw new Error(response?.data || "Error");
        }
      } catch (error) {
        dispatch(setError(error.message));
      }
    }
};

export const downvoteFromFeedAction = (userId?: string, postId?: string) =>  {

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
            if(response.data) dispatch(downvoteFromFeed({postId}));
          
        } else {
          throw new Error(response?.data || "Error");
        }
      } catch (error) {
        dispatch(setError(error.message));
      }
    }
};


export const undoUpvoteFromFeedAction = (userId?: string, postId?: string) =>  {

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
            if(response.data) dispatch(undoUpvoteFromFeed({postId}));
          
        } else {
          throw new Error(response?.data || "Error");
        }
      } catch (error) {
        dispatch(setError(error.message));
      }
    }
};

export const undoDownvoteFromFeedAction = (userId?: string, postId?: string) =>  {

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
            if(response.data) dispatch(undoDownvoteFromFeed({postId}));
          
        } else {
          throw new Error(response?.data || "Error");
        }
      } catch (error) {
        dispatch(setError(error.message));
      }
    }
};

export const deleteFromFeedAction = (userId?: string, postId?: string) =>  {

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
          dispatch(deleteFromFeed({postId}));
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

// export const deleteFromFeedAction = (userId?: string, postId?: string) =>  {

//   return async (dispatch) => {
//   //   dispatch(setLoading(true));
//   //   console.log('started');
//   const formData = new URLSearchParams();
//   formData.append("args", postId);
//   formData.append("args", userId);
//     try {
//       const response = await axios.post(DELETE,formData, {
//           headers: {
//             'Content-Type': 'application/x-www-form-urlencoded',
//           },
//         });

//       if (response.status === 200) {
//           console.log('delete',response.data);
//           dispatch(deleteFromFeed({postId}));
        
//       } else {
//         throw new Error(response?.data?.message || "Error");
//       }
//     } catch (error) {
//       dispatch(setError(error.message));
//     }
//   }
// };

export const appealFromFeedAction = (userId?: string, postId?: string) =>  {

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
          dispatch(appealFromFeed({postId}));
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