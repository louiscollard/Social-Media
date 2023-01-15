import { createSlice } from "@reduxjs/toolkit";

interface Post {
	_id?: string;
}

interface User {
	friends: any[];
}

interface InitialState {
	mode: string;
	user: User;
	token: string | null;
	posts: Post[];
}

const initialState: InitialState = {
	mode: "light",
	user: { friends: [] },
	token: null,
	posts: [],
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setMode: (state) => {
			state.mode = state.mode === "light" ? "dark" : "light";
		},
		setLogin: (state, action) => {
			state.user = { ...action.payload.user, friends: [] };
			state.token = action.payload.token;
		},
		setLogout: (state) => {
			state.user = { friends: [] };
			state.token = null;
		},
		setFriends: (state, action) => {
			if (state.user) {
				state.user.friends = action.payload.friends;
			} else {
				console.error("user friends non-existent :(");
			}
		},
		setPosts: (state, action) => {
			state.posts = action.payload.posts;
		},
		setPost: (state, action) => {
			const updatedPosts = state.posts.map((post) => {
				if (post._id === action.payload.post._id) return action.payload.post;
				return post;
			});
			state.posts = updatedPosts;
		},
	},
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } = authSlice.actions;
export default authSlice.reducer;
