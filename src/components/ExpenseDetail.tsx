import type { category, Expense } from "../types/index"
import { formatDate } from "../helpers/index"
import { AmountDisplay } from "./AmountDisplay"
import { useMemo } from "react"
import { categories } from "../data/categories"

import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';
import { useBudget } from "../hooks/useBudget"

type ExpenseDetailProps = {
    expense: Expense
}
export const ExpenseDetail = ({ expense }: ExpenseDetailProps) => {

    const { dispatch } = useBudget();

    const categoryInfo: category | undefined = useMemo(() => categories.filter(cat => cat.id === expense.category)[0], [expense]);

    const leadingActionsOpt = () => (
        <LeadingActions>
            <SwipeAction onClick={() => dispatch({ type: 'edit-expense', payload: { id: expense.id } })}>
                Actializar
            </SwipeAction>
        </LeadingActions>
    )

    const trailingActionsOpt = () => (
        <TrailingActions>
            <SwipeAction onClick={() => dispatch({ type: 'delete-expense', payload: { id: expense.id } })} destructive={true}>
                Eliminar
            </SwipeAction>
        </TrailingActions>
    )

    return (
        <SwipeableList>
            <SwipeableListItem maxSwipe={1} leadingActions={leadingActionsOpt()} trailingActions={trailingActionsOpt()}>
                <div className="bg-white shadow-lg p-5 w-full border-b border-gray-200 flex gap-5 items-center ">
                    <div>
                        <img src={`/icono_${categoryInfo?.icon}.svg`} className="w-20" alt={categoryInfo?.name} />

                    </div>

                    <div className="flex-1 space-y-2">
                        <p className="text-sm font-bold uppercase text-slate-500">{categoryInfo?.name}</p>
                        <p>{expense.expenseName}</p>
                        <p className="text-slate-600 text-sm">{formatDate(expense.date!.toString())}</p>
                    </div>

                    <AmountDisplay amount={expense.amount} />

                </div>
            </SwipeableListItem>
        </SwipeableList >

    )
}