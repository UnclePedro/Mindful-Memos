export interface User {
  id: string;
  apiKey: string;
}

export const emptyUser: User = {
  id: "",
  apiKey: "",
};
