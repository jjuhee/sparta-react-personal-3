import { createSlice } from "@reduxjs/toolkit";
//import fakeData from "fakeData.json";
import { useEffect } from "react";

//const initialState = fakeData;

const initialState = [
  {
    createdAt: "2023-11-03T02:07:09.423Z",
    nickname: "Dr. Clint Christiansen",
    avatar:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/36.jpg",
    content:
      "카리나1 Vitae recusandae tenetur debitis impedit ut dolorem atque reprehenderit magnam. Cum dolor magnam commodi qui perferendis. Vel temporibus soluta. Eum delectus blanditiis. Neque dicta non quod ex. Maiores aspernatur fuga reprehenderit a magni eaque fuga voluptatum hic.",
    writedTo: "카리나",
    id: "1",
  },
];

const lettersSlice = createSlice({
  name: "letters",
  initialState,
  reducers: {
    updateLetters: (state, action) => {
      const newLetter = action.payload;
      return [...newLetter];
    },
    addLetter: (state, action) => {
      const newLetter = action.payload;
      return [newLetter, ...state];
      //state.push(action.payload);
    },
    deleteLetter: (state, action) => {
      return state.filter((letter) => letter.id !== action.payload);
    },
    editLetter: (state, action) => {
      const { id, editingText } = action.payload;
      return state.map((letter) => {
        if (letter.id === id) {
          return { ...letter, content: editingText };
        }
        return letter;
      });
    },
  },
});

export default lettersSlice.reducer;
export const { updateLetters, addLetter, deleteLetter, editLetter } =
  lettersSlice.actions;
