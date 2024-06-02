import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "axios";
import {
  UserData as UserDataWithourPosition,
  User,
} from "../../intreface/user";
import moment from "moment";

type UserData = {
  data: User[] | [];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  savingError: boolean | null;
  savingLoader: boolean;
  addCardLoader: boolean;
  addCardError: boolean;
  saveDate: string;
};

const initialState: UserData = {
  data: [],
  status: "idle",
  error: null,
  savingError: null,
  savingLoader: false,
  addCardLoader: false,
  addCardError: false,
  saveDate: "",
};

export const fetchCards = createAsyncThunk("/api/users", async () => {
  const res = await axios.get("/api/users");
  return res.data;
});

export const saveFetchCards = createAsyncThunk("/api/saveData", async () => {
  const res = await axios.post("/api/saveData");
  return res.data;
});

export const addNewCard = createAsyncThunk(
  "/api/addCard",
  async (data: UserDataWithourPosition) => {
    await axios.post("/api/addCard");
    return data;
  }
);

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    clearData(state) {
      state.data = [];
    },
    rearrangeCards(state, action) {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCards.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.status = "succeeded";
        const resData = action.payload.sort(
          (a: { position: number }, b: { position: number }) =>
            a.position - b.position
        );
        state.data = resData;
        state.saveDate = moment().format();
      })
      .addCase(fetchCards.rejected, (state) => {
        state.status = "failed";
        state.error = "API failed";
      })
      .addCase(saveFetchCards.pending, (state) => {
        state.savingLoader = true;
      })
      .addCase(saveFetchCards.fulfilled, (state) => {
        state.savingLoader = false;
        state.savingError = false;
        state.data.forEach((el: User, index: number) => (el.position = index));
        state.saveDate = moment().format();
      })
      .addCase(saveFetchCards.rejected, (state) => {
        state.savingLoader = false;
        state.savingError = true;
      })
      .addCase(addNewCard.pending, (state) => {
        state.addCardLoader = true;
      })
      .addCase(addNewCard.fulfilled, (state, action) => {
        state.addCardLoader = false;
        state.addCardError = false;
        const index = state.data.length;
        const obj = {
          ...action.payload,
          position: index,
        };
        const data = JSON.parse(JSON.stringify(current(state.data)));
        data.push(obj);
        state.data = data;
        state.saveDate = moment().format();
      })
      .addCase(addNewCard.rejected, (state) => {
        state.addCardLoader = false;
        state.addCardError = true;
      });
  },
});

export const userSliceActions = userSlice.actions;
