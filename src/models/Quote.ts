export interface Quote {
  quote: string;
  author: string;
  id: number;
  userId: string;
  user: {
    profilePictureUrl: string; // Nested inside the user object
  };
}

export const emptyQuoteObj: Quote = {
  quote: "",
  author: "",
  userId: "",
  id: 0,
  user: {
    profilePictureUrl: "", // Default to an empty string if no URL
  },
};
