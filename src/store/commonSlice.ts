import { FullScreenLoaderType, ToastInfoType } from "@/interface/common";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CommonState {
	fullScreenLoader: FullScreenLoaderType;
	toastInfo: ToastInfoType;
}

const initialState: CommonState = {
	fullScreenLoader: false,
	toastInfo: null,
};

export const commonSlice = createSlice({
	name: "common",
	initialState,
	reducers: {
		setFullScreenLoading: (state, action: PayloadAction<boolean>) => {
			state.fullScreenLoader = action.payload;
		},
		setToastInfo: (state, action: PayloadAction<ToastInfoType>) => {
			state.toastInfo = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { setFullScreenLoading, setToastInfo } = commonSlice.actions;

export default commonSlice.reducer;
