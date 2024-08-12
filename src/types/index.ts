type ValuePiece = Date | null;

export type Value = ValuePiece | [ValuePiece, ValuePiece];

export type Expense = {
    id: string;
    expenseName: string;
    amount: number;
    expectedamount: number;
    category: string;
    date: Value;
}

export type DraftExpense = Omit<Expense, 'id'>

export type category = {
    id: string;
    name: string;
    icon: string;
}
