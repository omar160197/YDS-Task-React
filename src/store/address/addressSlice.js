import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAddress =createAsyncThunk(
  "tasks/getAddress",
  async(id,thunkAPI) =>{
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await axios.get(`http://127.0.0.1:8000/address`);
        return res.data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
  }  
);

export const getAddressStates =createAsyncThunk(
  "tasks/getAddressStates",
  async(id,thunkAPI) =>{
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await axios.get(`http://127.0.0.1:8000/address/states/`);
        return res.data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
  }  
);


export const addTask = createAsyncThunk(
    'tasks/addTask',
    async (taskData, thunkAPI) => {
      console.log(taskData);
      const { rejectWithValue } = thunkAPI;
      try {
         await axios.post("http://127.0.0.1:8000/address/", taskData);
         const res = await axios.get(`http://127.0.0.1:8000/address/`); 
        return res.data ;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );


  export const updateTask = createAsyncThunk(
    'tasks/updateTask',
    async (allData, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      // console.log(allData);
      const {id} = allData
      const {taskdata} = allData
      try {
        await axios.put(`http://127.0.0.1:8000/address/${id}/`,  taskdata )
        const res = await axios.get(`http://127.0.0.1:8000/address/`); 
        return res.data ;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

  export const deleteTask = createAsyncThunk(
    'tasks/deleteTask',
    async (allData, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      const {id,employeeId} = allData
        console.log(allData); 
      try {

         await axios.delete(`http://127.0.0.1:8000/address/${id}`)
         const res = await axios.get(`http://127.0.0.1:8000/address/`); 
        return res.data ;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  )


  const initialState = {
    allAddresses: [],
    allStates: [],
    selectedtask:null,
    isLoading: false,
    isError: false,
    message: null,
    isSuccess: false,
  };

  export const addressSlice=createSlice({
    name:"pets",
    initialState,
    reducers:{
        selectTask: (state,action) => {
            state.selectedtask=action.payload
          },
          reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = "";
          },
    },
    extraReducers:{
      [getAddress.pending]:(state,action)=>{
        console.log(action);
        state.isLoading = true;
        state.isError = false;
      },
      [getAddress.fulfilled]:(state,action)=>{
         console.log(action.payload);
         state.allAddresses=action.payload;
         state.isLoading=false;
         state.isError=false;
         state.isSuccess=true; 
      },
      [getAddress.rejected]:(state,action)=>{
          console.log(action)
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
      },

      [getAddressStates.pending]:(state,action)=>{
        console.log(action);
        state.isLoading = true;
        state.isError = false;
      },
      [getAddressStates.fulfilled]:(state,action)=>{
         console.log(action.payload);
         state.allStates=action.payload;
         state.isLoading=false;
         state.isError=false;
         state.isSuccess=true; 
      },
      [getAddressStates.rejected]:(state,action)=>{
          console.log(action)
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
      },

      [updateTask.pending]:(state,action)=>{
        console.log(action);
        state.isLoading = true;
        state.isError = null;
      },
      [updateTask.fulfilled]:(state,action)=>{
         console.log(action.payload);
         state.allAddresses=action.payload;
         state.isLoading=false;
         state.isError=false;
         state.isSuccess=true; 
      },
      [updateTask.rejected]:(state,action)=>{
          console.log(action)
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
      },

      [addTask.pending]:(state,action)=>{
        console.log(action);
        state.isLoading = true;
        state.isError = false;
      },
      [addTask.fulfilled]:(state,action)=>{
         console.log(action.payload);
         state.allAddresses=action.payload;
         state.isLoading=false;
         state.isError=false;
         state.isSuccess=true; 
      },
      [addTask.rejected]:(state,action)=>{
          console.log(action)
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
      },

      [deleteTask.pending]:(state,action)=>{
        console.log(action);
        state.isLoading = true;
        state.isError = null;
      },
      [deleteTask.fulfilled]:(state,action)=>{
         console.log(action.payload);
         state.allAddresses=action.payload;
         state.isLoading=false;
         state.isError=false;
         state.isSuccess=true; 
      },
      [deleteTask.rejected]:(state,action)=>{
          console.log(action)
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
      }
    }
})
export const { selectTask ,reset } = addressSlice.actions;
export default addressSlice.reducer;