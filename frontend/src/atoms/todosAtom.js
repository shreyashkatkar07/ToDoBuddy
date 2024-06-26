import { atom, selector } from "recoil";
import axios from "axios";

export const todosAtom = atom({
  key: "todosAtom",
  default: selector({
    key: "todosAtomSelector",
    get: async () => {
      const res = await axios.get("http://localhost:3000/todos");
      return res.data;
    },
  }),
});
