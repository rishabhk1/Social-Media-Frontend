import { createSlice } from "@reduxjs/toolkit";

interface ModalState {
    members: boolean,
    mod: boolean
}
  
const initialState: ModalState = {
    members: false,
    mod: false
};

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        toggleMembers: (state) => {
            state.members = !state.members;
        },
        toggleMod: (state) => {
            state.mod = !state.mod;
        }
    }
});


export const { toggleMembers, toggleMod } = modalSlice.actions;

export default modalSlice.reducer;