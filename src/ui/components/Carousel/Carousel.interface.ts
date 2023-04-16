interface ListAccount {
  id: number;
  name: string;
  balance: number;
  currency: string;
  type: string;
}

interface ListEvent {
  id: number;
  name: string;
  balance: number;
  currency: string;
}

interface listBudget {
  id: number;
  name: string;
  income: number;
  expensive: number;
  currency: string;
}

interface ListHeritage {
  id: number;
  name: string;
  balance: number;
  currency: string;
}

export interface CarouselProp {
  listAccount?: ListAccount[];
  listEvent?: ListEvent[];
  listBudget?: listBudget[];
  listHeritage?: ListHeritage[];
  label: string;
  type: 'account'| 'event' | 'budget' | 'budget';
}