import { useReducer, createContext, Dispatch, ReactNode, useMemo } from "react"
import { budgetReducer, budgetInitialState, ButgetState, ButgetActions } from "../reducers/budget-reducer"

type BudgetContextProps = {
    state: ButgetState
    dispatch: Dispatch<ButgetActions>
    totalExpenses: number
    remaining: number
}

type BudgetProviderProps = {
    children: ReactNode
}
export const BudgetContext = createContext<BudgetContextProps>(null!)

export const BudgetProvider = ({ children }: BudgetProviderProps) => {

    const [state, dispatch] = useReducer(budgetReducer, budgetInitialState);

    const totalExpenses = useMemo(() => state.expenses.reduce((total, expense) => total + expense.amount, 0), [state.expenses]);
    const remaining = useMemo(() => state.budget - totalExpenses, [state.budget, totalExpenses]);

    return (
        <BudgetContext.Provider
            value={{ state, dispatch, totalExpenses, remaining }}>
            {children}
        </BudgetContext.Provider>
    )
}