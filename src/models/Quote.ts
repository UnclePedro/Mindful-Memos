export interface Quote {
  quote: string;
  author: string;
  authorId: number;
  id: number;
}

export const emptyQuoteObj: Quote = {
  quote: "",
  author: "",
  authorId: 0,
  id: 0,
};
