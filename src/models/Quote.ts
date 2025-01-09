export interface Quote {
  quote: string;
  author: string;
  id: number;
  userId: string;
}

export const emptyQuoteObj: Quote = {
  quote: "",
  author: "",
  userId: "",
  id: 0,
};
