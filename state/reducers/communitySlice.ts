import { createSlice } from "@reduxjs/toolkit";

// interface ModalState {
//     members: boolean,
//     mod: boolean
// }

interface User {
    id: string;
    username: string;
    email: string;
    reputation: number;
}

interface Post {
    id: string; // should start with p
    title: string;
    content: string;
    author: string;
    score: number;
    createdAt: string; // Assuming it's a string representation of a date/time
    comments: string[]; // list of ids
    hidden: boolean;
    community: string;
    hideCount: number;
    showCount: number;
    authorName: string;
    communityName: string;
    hasUpvoted: boolean;
    hasDownvoted: boolean;
  }



export interface CommunityState {
    id: string | null;
    name: string | null;
    description: string | null;
    posts: (Post)[];
    appealed: (Post)[];
    moderators: (User)[];
    members: (User)[];
    loading: boolean;
    error: string | null;
    nextPagePost: number;
    nextPageAppealed: number;
  }
  
  const initialState: CommunityState = {
    id:  null,
    name:  null,
    description:  null,
    posts: [],
    appealed: [],
    moderators: [],
    members: [],
    loading: false,
    error: null,
    nextPagePost: 0,
    nextPageAppealed: 0,
  };

  export const communitySlice = createSlice({
    name: "community",
    initialState,
    reducers: {
      // Add a reducer to update the state with new posts
      setCommunity(state, action){
        state.id=action.payload.id;
        state.name=action.payload.name;
        state.description=action.payload.description;
        state.moderators=action.payload.moderators;
        state.members=action.payload.members;
      },
      setPosts(state, action) {
        console.log('inside slice');
        console.log(action.payload.posts);
        state.posts = [...state.posts, ...action.payload.posts];
        state.nextPagePost = action.payload.hasMorePages ? state.nextPagePost + 1 : -2;
        //state.nextPage = action.payload.hasMorePages ? state.nextPage + 1 : -2;
      },
      setAppealed(state, action) {
        console.log('inside slice');
        console.log(action.payload.appealed);
        state.appealed = [...state.appealed, ...action.payload.appealed];
        state.nextPageAppealed = action.payload.hasMorePages ? state.nextPageAppealed + 1 : -2;
      },
      // Add a reducer to set the loading state
      setLoading(state, action) {
        state.loading = action.payload;
      },
      // Add a reducer to set an error message
      setError(state, action) {
        state.error = action.payload;
      },
      clearCommunity(state){
        state.posts=[];
        state.nextPageAppealed=0;
        state.nextPagePost=0;
        state.appealed=[];
        state.members=[];
        state.moderators=[];
      },
      upvoteFromCommunity(state, action){
        // console.log(action.payload.postId);
        // state.posts.map((post) =>
        //     post.id === action.payload.postId
        //     ? { ...post, score: post.score + 1, hasUpvoted: true, hasDownvoted: false }
        //     : post
        // )
        console.log(action.payload.postId);
        if(action.payload.postId.startsWith('p')){
            const updatedPosts = state.posts.map((post) =>
            post.id === action.payload.postId
              ? { ...post, score: post.score + (post.hasDownvoted?2:1), hasUpvoted: true, hasDownvoted: false }
              : post
          );
          const updatedAppealed = state.appealed.map((post) =>
          post.id === action.payload.postId
            ? { ...post, score: post.score + (post.hasDownvoted?2:1), hasUpvoted: true, hasDownvoted: false }
            : post
        );

          return {
            ...state,
            posts: updatedPosts,
            appealed: updatedAppealed
          };
        }
      },
      downvoteFromCommunity(state, action){
        // state.posts.map((post) =>
        //     post.id === action.payload.postId
        //     ? { ...post, score: post.score - 1,hasUpvoted: false, hasDownvoted: true }
        //     : post
        // )
        if(action.payload.postId.startsWith('p')){
            const updatedPosts = state.posts.map((post) =>
            post.id === action.payload.postId
              ? { ...post, score: post.score - (post.hasUpvoted?2:1), hasUpvoted: false, hasDownvoted: true }
              : post
          );
          const updatedAppealed = state.appealed.map((post) =>
          post.id === action.payload.postId
            ? { ...post, score: post.score - (post.hasUpvoted?2:1), hasUpvoted: false, hasDownvoted: true }
            : post
        );
          return {
            ...state,
            posts: updatedPosts,
            appealed: updatedAppealed
          };
        }

      },
      undoUpvoteFromCommunity(state, action){
        // state.posts.map((post) =>
        //     post.id === action.payload.postId
        //     ? { ...post, score: post.score - 1, hasUpvoted: false }
        //     : post
        // )
        if(action.payload.postId.startsWith('p')){
            const updatedPosts = state.posts.map((post) =>
            post.id === action.payload.postId
              ? { ...post, score: post.score - 1, hasUpvoted: false }
              : post
          );
          const updatedAppealed = state.appealed.map((post) =>
          post.id === action.payload.postId
            ? { ...post, score: post.score - 1, hasUpvoted: false }
            : post
        );
          return {
            ...state,
            posts: updatedPosts,
            appealed: updatedAppealed
          };
        }
;
      },
      undoDownvoteFromCommunity(state, action){
        // state.posts.map((post) =>
        //     post.id === action.payload.postId
        //     ? { ...post, score: post.score + 1, hasDownvoted: false}
        //     : post
        // )
        if(action.payload.postId.startsWith('p')){
            const updatedPosts = state.posts.map((post) =>
            post.id === action.payload.postId
              ? { ...post, score: post.score + 1, hasDownvoted: false }
              : post
          );
          const updatedAppealed = state.appealed.map((post) =>
          post.id === action.payload.postId
            ? { ...post, score: post.score + 1, hasDownvoted: false }
            : post
        );
          return {
            ...state,
            posts: updatedPosts,
            appealed: updatedAppealed
          };            
        }
      }
      // You can add more reducers here for specific actions related to post management
    },
  });
  
  // Export the actions
export const { setCommunity, setPosts, setAppealed, setLoading, setError, clearCommunity, upvoteFromCommunity, downvoteFromCommunity, undoUpvoteFromCommunity, undoDownvoteFromCommunity } = communitySlice.actions;


export default communitySlice.reducer;