export interface InputProps {
  value: string;
  placeHolder: string;
  name: string;
  type: string;
  onChange: (value: string) => void;
}

export interface IInitialState {
  isLoading: boolean;
  isSuccess: boolean;
  responseMessage: string | null;
  updatedAt: number | null | Date;
}

export interface Todo {
  id: string;
  title: string;
  status: string;
}
