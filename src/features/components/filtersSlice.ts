import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';


export interface FiltersState {
  name: string,
  type: string,
}

export type FiltersStruct = {
  name: string,
  type: string,
}

const initialState: FiltersState = {
  name: "",
  type: 'all',
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    changeName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    changeType: (state, action: PayloadAction<string>) => {
      state.type = action.payload;
    }
  },
});

export const { changeName, changeType } = filtersSlice.actions;

export const selectName = (state: RootState) => state.filters.name;
export const selectType = (state: RootState) => state.filters.type;


export const selectFilters = (state: RootState) => ({
  name: state.filters.name,
  type: state.filters.type,
})


export default filtersSlice.reducer;
