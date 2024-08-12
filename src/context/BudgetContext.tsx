import { useReducer, createContext, Dispatch, ReactNode, useMemo } from "react"
import { budgetReducer, budgetInitialState, ButgetState, ButgetActions } from "../reducers/budget-reducer"

type BudgetContextProps = {
    state: ButgetState
    dispatch: Dispatch<ButgetActions>
    totalExpenses: number
    remaining: number
    totalExpectedamount: number
}

type BudgetProviderProps = {
    children: ReactNode
}
export const BudgetContext = createContext<BudgetContextProps>(null!)

export const BudgetProvider = ({ children }: BudgetProviderProps) => {

    const [state, dispatch] = useReducer(budgetReducer, budgetInitialState);

    const totalExpenses = useMemo(() => state.expenses.reduce((total, expense) => total + expense.amount, 0), [state.expenses]);
    const remaining = useMemo(() => state.budget - totalExpenses, [state.budget, totalExpenses]);
    const totalExpectedamount = useMemo(() => state.expenses.reduce((total, expense) => total + expense.expectedamount, 0), [state.expenses]);

    return (
        <BudgetContext.Provider
            value={{ state, dispatch, totalExpenses, remaining, totalExpectedamount}}>
            {children}
        </BudgetContext.Provider>
    )
}