import { createSlice } from "@reduxjs/toolkit";
import { APP_ROUTES } from '../../constants/route.const';

const ROUTE_STATE = {
  currentRoute: APP_ROUTES.DOC,
};

const routeSlice = createSlice({
    name: "document",
     initialState: ROUTE_STATE,
     reducers:{
       switchRoute: (state, action) => {
         const { documents } = action.payload; 
  return { ...state, currentRoute: documents }; 
     },
     },
    });

     export const {switchRoute} = routeSlice.actions;
     export default routeSlice.reducer;
