export interface Quote {
  quote: string;
  author: string;
  authorId: string;
  id: number;
}

export const emptyQuoteObj: Quote = {
  quote: "",
  author: "",
  authorId: "",
  id: 0,
};
