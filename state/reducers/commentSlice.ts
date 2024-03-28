import { createSlice } from "@reduxjs/toolkit";

// interface ModalState {
//     members: boolean,
//     mod: boolean
// }


  interface Comment {
    id: string; // should start with c
    content: string;
    author: string;
    score: number;
    createdAt: string; // Assuming it's a string representation of a date/time
    replies: string[]; // list of ids
    hidden: boolean;
    community: string;
    hideCount: number;
    showCount: number;
    authorName: string;
    communityName: string;
    hasUpvoted: boolean;
    hasDownvoted: boolean;
    isAppealed: boolean;
    hasShowvoted: boolean;
    hasHidevoted: boolean;
  }

export interface CommentState {
    posts: (Comment)[];
    loading: boolean;
    error: string | null;
    nextPage: number;
  }
  
  const initialState: CommentState = {
    posts: [],
    loading: false,
    error: null,
    nextPage: 0
  };

  export const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {
      // Add a reducer to update the state with new posts
      setPost(state, action) {
        console.log('inside slice');
        console.log(action.payload.posts);
        if(!action.payload.posts.hidden){
          state.posts = [action.payload.posts];
        }
        //state.nextPage = action.payload.hasMorePages ? state.nextPage + 1 : -2;
      },
      setComments(state, action) {
        console.log('inside slice');
        console.log(action.payload.posts);
        state.posts = [...state.posts, ...action.payload.posts];
        state.nextPage = action.payload.hasMorePages ? state.nextPage + 1 : -2;
      },
      // Add a reducer to set the loading state
      setLoading(state, action) {
        state.loading = action.payload;
      },
      // Add a reducer to set an error message
      setError(state, action) {
        state.error = action.payload;
      },
      clearComments(state){
        state.posts=[];
        state.nextPage=0;
        state.error=null;
        state.loading=false;
      },
      upvoteFromComment(state, action){
        // console.log(action.payload.postId);
        // state.posts.map((post) =>
        //     post.id === action.payload.postId
        //     ? { ...post, score: post.score + 1, hasUpvoted: true, hasDownvoted: false }
        //     : post
        // )
        console.log(action.payload.postId);
        const updatedPosts = state.posts.map((post) =>
          post.id === action.payload.postId
            ? { ...post, score: post.score + (post.hasDownvoted?2:1), hasUpvoted: true, hasDownvoted: false }
            : post
        );
      
        return {
          ...state,
          posts: updatedPosts,
        };
      },
      downvoteFromComment(state, action){
        // state.posts.map((post) =>
        //     post.id === action.payload.postId
        //     ? { ...post, score: post.score - 1,hasUpvoted: false, hasDownvoted: true }
        //     : post
        // )
        const updatedPosts = state.posts.map((post) =>
          post.id === action.payload.postId
            ? { ...post, score: post.score - (post.hasUpvoted?2:1), hasUpvoted: false, hasDownvoted: true }
            : post
        );
      
        return {
          ...state,
          posts: updatedPosts,
        };
      },
      undoUpvoteFromComment(state, action){
        // state.posts.map((post) =>
        //     post.id === action.payload.postId
        //     ? { ...post, score: post.score - 1, hasUpvoted: false }
        //     : post
        // )
        const updatedPosts = state.posts.map((post) =>
          post.id === action.payload.postId
            ? { ...post, score: post.score - 1, hasUpvoted: false }
            : post
        );
      
        return {
          ...state,
          posts: updatedPosts,
        };
      },
      undoDownvoteFromComment(state, action){
        // state.posts.map((post) =>
        //     post.id === action.payload.postId
        //     ? { ...post, score: post.score + 1, hasDownvoted: false}
        //     : post
        // )
        const updatedPosts = state.posts.map((post) =>
          post.id === action.payload.postId
            ? { ...post, score: post.score + 1, hasDownvoted: false }
            : post
        );
      
        return {
          ...state,
          posts: updatedPosts,
        };
      },
      deleteFromComment(state,action){
        const updatedPosts = state.posts.filter((post) =>
          post.id !== action.payload.postId
        )
        return {
          ...state,
          posts: updatedPosts,
        };
      },
      appealFromComment(state,action){
        const updatedPosts = state.posts.map((post) =>
          post.id === action.payload.postId
            ? { ...post, isAppealed: true }
            : post
        );
        return {
          ...state,
          posts: updatedPosts,
        };
      }


      // You can add more reducers here for specific actions related to post management
    },
  });
  
  // Export the actions
export const { appealFromComment, deleteFromComment,setPost, setComments, setLoading, setError, clearComments, upvoteFromComment, downvoteFromComment, undoUpvoteFromComment, undoDownvoteFromComment } = commentSlice.actions;


export default commentSlice.reducer;