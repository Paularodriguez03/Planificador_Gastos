import { useMemo } from "react"
import { useBudget } from "../hooks/useBudget"
import { ExpenseDetail } from "./ExpenseDetail"

export const ExpenseList = () => {

    const { state } = useBudget();

    const filteredExpenses = state.currentFilter ? state.expenses.filter(expense => expense.category === state.currentFilter) : state.expenses
    const isEmpty = useMemo(() =>filteredExpenses.length === 0, [filteredExpenses])
    
    return (
        <div className="mt-10 bg-white shadow-lg rounded-lg p-10" >
            {
                isEmpty ?
                    <p className="text-center text-gray-600 text-2xl font-bold">No hay gastos</p>
                    :
                   <>
                    <p className="text-center text-gray-600 text-2xl font-bold pb-5">Listado de  gastos</p>
                    { filteredExpenses.map(expense => <ExpenseDetail key={expense.id} expense={expense} />)}
                   </>
            }
        </div>
    )
}
