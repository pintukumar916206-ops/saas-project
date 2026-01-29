import { createSlice } from "@reduxjs/toolkit";

const popupSlice = createSlice({
  name: "popup",
  initialState: {
    settingPopup: false,
    addBookPopup: false,
    readBookPopup: false,
    recordBookPopup: false,
    returnBookPopup: false,
    addNewAdminPopup: false,
    logoutConfirmPopup: false,
  },
  reducers: {
    toggleSettingPopup(state) {
      state.settingPopup = !state.settingPopup;
    },
    toggleAddBookPopup(state) {
      state.addBookPopup = !state.addBookPopup;
    },
    toggleReadBookPopup(state) {
      state.readBookPopup = !state.readBookPopup;
    },
    toggleRecordBookPopup(state) {
      state.recordBookPopup = !state.recordBookPopup;
    },
    toggleReturnBookPopup(state) {
      state.returnBookPopup = !state.returnBookPopup;
    },
    toggleAddNewAdminPopup(state) {
      state.addNewAdminPopup = !state.addNewAdminPopup;
    },
    toggleLogoutConfirmPopup(state) {
  state.logoutConfirmPopup = !state.logoutConfirmPopup;
},

    closeAllPopups(state) {
      state.settingPopup = false;
      state.addBookPopup = false;
      state.readBookPopup = false;
      state.recordBookPopup = false;
      state.returnBookPopup = false;
      state.addNewAdminPopup = false;
      state.logoutConfirmPopup = false;
    },
  },
});

export const {
  toggleSettingPopup,
  toggleAddBookPopup,
  toggleReadBookPopup,
  toggleRecordBookPopup,
  toggleReturnBookPopup,
  toggleAddNewAdminPopup,
  toggleLogoutConfirmPopup,
  closeAllPopups,
} = popupSlice.actions;


export default popupSlice.reducer;
