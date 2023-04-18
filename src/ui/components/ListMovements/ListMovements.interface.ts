export interface Movements {
  id: number;
  description: string | null;
  amount: number;
  trm: number;
  date_purchase: string;
  account: {
    id: number;
    name: string;
  };
  category: {
    id: number;
    name: string;
  };
  event: {
    id: number;
    name: string;
  } | null;
}

export interface ListMovementsProps {
  movements?: Movements[];
}
