interface Movements {
    id: number;
    category: {
        name: string;
    };
    amount: number;
    date_purchase: string;
    event: {
        name: string;
    } | null;
    description: string | null;
}

export interface ListMovementsProps {
    movements: Movements[];
  }
  