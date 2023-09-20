/* eslint-disable @typescript-eslint/no-explicit-any */
import { StateCreator } from "zustand";
import { IInitialState, Todo } from "../../interfaces/interfaces";

export interface ITodoSlice {
  todoList: IInitialState & { info: Todo[] };

  addTodoList: (data: Todo) => void;
  deleteTodoAction: (id: string) => void;
  markCompleteAction: (id: string) => void;
  markAllCompleteAction: (data: string[]) => void;
  deleteAllAction: (data: string[]) => void;
}

const initialState: IInitialState & { info: Todo[] } = {
  isLoading: false,
  isSuccess: false,
  info: [],
  responseMessage: null,
  updatedAt: Date.now(),
};

const objState = (
  data: [boolean, boolean, Todo[], string | null, Date | null]
): IInitialState & { info: Todo[] } => ({
  isLoading: data[0],
  isSuccess: data[1],
  info: data[2],
  responseMessage: data[3],
  updatedAt: data[4],
});

const todoSlice: StateCreator<ITodoSlice> = (set) => ({
  todoList: initialState,

  addTodoList: (data) => {
    set((state) => ({
      ...state,
      todoList: objState([
        false,
        true,
        [...state.todoList.info, data],
        null,
        new Date(Date.now()),
      ]),
    }));
  },

  deleteTodoAction: (data) => {
    set((state) => ({
      ...state,
      todoList: objState([
        false,
        true,
        state.todoList.info.filter((todo) => todo.id !== data),
        null,
        new Date(Date.now()),
      ]),
    }));
  },
  markCompleteAction: (data) => {
    set((state) => ({
      ...state,
      todoList: objState([
        false,
        true,
        state.todoList.info.map((todo) =>
          todo.id === data ? { ...todo, status: "Completed" } : todo
        ),
        null,
        new Date(Date.now()),
      ]),
    }));
  },
  markAllCompleteAction: (data) => {
    set((state) => ({
      ...state,
      todoList: objState([
        false,
        true,
        state.todoList.info.map((todo) =>
          data.includes(todo.id) ? { ...todo, status: "Completed" } : todo
        ),
        null,
        new Date(Date.now()),
      ]),
    }));
  },
  deleteAllAction: (data) => {
    set((state) => ({
      ...state,
      todoList: objState([
        false,
        true,
        state.todoList.info.filter((todo) => !data.includes(todo.id)),
        null,
        new Date(Date.now()),
      ]),
    }));
  },
});

export default todoSlice;
