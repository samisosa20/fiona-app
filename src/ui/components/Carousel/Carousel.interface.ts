export interface ListAccount {
  id: number;
  name: string;
  balance: number;
  init_amount: number;
  description: string | null;
  incomes?: number;
  expensives?: number;
  currency: {
    id: number;
    code: string;
  };
  type: string;
  deleted_at?: string | null;
}

export interface ListEvent {
  id: number;
  name: string;
  balance: number;
  currency: string;
  end_event: string;
  movements?: any;
}

export interface listBudget {
  id: number;
  name: string;
  income: number;
  expensive: number;
  currency: string;
}

export interface HeritageBalance {
  currency: string;
  comercial_amount: number;
  legal_amount: number;
  movements: number;
}

export interface ListHeritage {
  year: any;
  balance: HeritageBalance[];
}

export interface CarouselProp {
  listAccount?: ListAccount[];
  listEvent?: ListEvent[];
  listBudget?: listBudget[];
  listHeritage?: ListHeritage[];
  label: string;
  type: 'Account'| 'Event' | 'Budget' | 'Heritage';
}