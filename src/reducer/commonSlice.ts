import { FullScreenLoaderType, ToastInfoType } from "@/interface/common";
import { DateRangeType } from "@/interface/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CommonState {
	fullScreenLoader: FullScreenLoaderType;
	toastInfo: ToastInfoType;
	dateRange: DateRangeType | null;
}

const initialState: CommonState = {
	fullScreenLoader: false,
	toastInfo: null,
	dateRange: null,
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
		setDateRange: (state, action: PayloadAction<DateRangeType>) => {
			state.dateRange = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { setFullScreenLoading, setToastInfo, setDateRange } = commonSlice.actions;

export default commonSlice.reducer;
