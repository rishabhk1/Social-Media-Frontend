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
    hasShowvoted: boolean;
    hasHidevoted: boolean;
    isAppealed: boolean;
  }

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


export interface CommunityState {
    id: string | null;
    name: string | null;
    description: string | null;
    posts: (Post)[];
    appealed: (Post | Comment)[];
    moderators: (User)[];
    members: (User)[];
    loading: boolean;
    error: string | null;
    nextPagePost: number;
    nextPageAppealed: number;
    joined: boolean
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
    joined: false
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
        for (const user of action.payload.members) {
            if (user.id === action.payload.userId) {
                state.joined=true;
            }
          }
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
        // state.appealed = [...state.appealed, ...action.payload.appealed];

        const appealed = action.payload.appealed.map(item => {
          if (item.Post) {
            return item.Post;
          } else {
            return item.Comment;
          }
        });
      
        console.log(appealed);
        state.appealed = [...state.appealed, ...appealed];


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
      },
      joinCommunity(state, action){
        const user: User = {
            id: action.payload.id,
            username: action.payload.username,
            email: action.payload.email,
            reputation: action.payload.reputation,
          };
          
        const members = [...state.members, user]
        return {
            ...state,
            members: members,
            joined: true
            }; 
      },
      unjoinCommunity(state, action){
        const members = [];
        //console.log('unjoin',action.payload.user_id);
        for (const user of state.members) {
          if (user.id !== action.payload.userId) {
            members.push(user);
          }
        }
        return {
            ...state,
            members: members,
            joined: false
            }; 
      
      },
      deleteFromCommunity(state,action){
        if(action.payload.postId.startsWith('p')){
          const updatedPosts = state.posts.filter((post) =>
            post.id !== action.payload.postId
          )
          return {
            ...state,
            posts: updatedPosts,
          };
        }
        const updatedPosts = state.appealed.filter((post) =>
            post.id !== action.payload.postId
          )
          return {
            ...state,
            appealed: updatedPosts,
          };
      },
      appealFromCommunity(state,action){
        if(action.payload.postId.startsWith('p')){
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
          const updatedPosts = state.appealed.map((post) =>
          post.id === action.payload.postId
            ? { ...post, isAppealed: true }
            : post
        );
          return {
            ...state,
            appealed: updatedPosts,
          };
      },
      hideFromCommunity(state,action){
        const updatedAppeal = state.appealed.map((post) => {
          if(post.id === action.payload.postId) {
            return {
              ...post,
              hasHidevoted: true,
              hideCount: post.hideCount + 1,
              hidden: (post.hideCount+1) >= Math.ceil(state.moderators.length / 2)
            };
          } else {
            return post;
          }
        });
        const updatedPosts = state.posts.map((post) => {
          if(post.id === action.payload.postId) {
            return {
              ...post,
              hasHidevoted: true,
              hideCount: post.hideCount + 1,
              hidden: (post.hideCount+1) >= Math.ceil(state.moderators.length / 2)
            };
          } else {
            return post;
          }
        });        
        const RemovePosts = updatedPosts.filter((post) =>
          post.hidden == false
        )
        const RemoveAppeal = updatedAppeal.filter((post) =>
        post.hidden == false
      )
        return {
          ...state,
          appealed: RemoveAppeal,
          posts: RemovePosts
        };
      },
      showFromCommunity(state,action){
        const updatedPosts = state.appealed.map((post) =>
        post.id === action.payload.postId
          ? { ...post, hasShowvoted: true,  showCount: (post.showCount+1) >= Math.ceil(state.moderators.length / 2)?-100:post.showCount+1}
          : post
      );
      const RemovePosts = updatedPosts.filter((post) =>
        post.showCount!=-100
      )
        return {
          ...state,
          appealed: RemovePosts,
        };
      },
      // You can add more reducers here for specific actions related to post management
    },
  });
  
  // Export the actions
export const {showFromCommunity, hideFromCommunity, appealFromCommunity, deleteFromCommunity, joinCommunity,unjoinCommunity, setCommunity, setPosts, setAppealed, setLoading, setError, clearCommunity, upvoteFromCommunity, downvoteFromCommunity, undoUpvoteFromCommunity, undoDownvoteFromCommunity } = communitySlice.actions;


export default communitySlice.reducer;