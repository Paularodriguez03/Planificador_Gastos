import { ChangeEvent, useEffect, useState } from "react"
import type { DraftExpense, Value } from "../types/index"

import { categories } from "../data/categories"
import { ErrorMenssage } from "./ErrorMenssage"

import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { useBudget } from "../hooks/useBudget";

export const ExpenseForm = () => {

    const [expense, setExpense] = useState<DraftExpense>({
        expenseName: '',
        amount: 0,
        expectedamount: 0,
        category: '',
        date: new Date()
    });

    const [error, setError] = useState('');
    const [previusAmount, setPreviusAmount] = useState(0);

    const { state, dispatch, remaining} = useBudget()

    const handelChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        e.preventDefault();
        const { name, value } = e.target;
        const isAmount = ['amount', 'expectedamount'].includes(name);
        setExpense({ ...expense, [name]: isAmount ? +value : value })
    }

    const handelChangeDate = (value: Value) => {
        setExpense({ ...expense, date: value })
    }

    useEffect(() => {
        if (state.editingId === '') return; 
        const expenseEdit = state.expenses.filter(expense => expense.id === state.editingId)[0];
        setExpense(expenseEdit)
        setPreviusAmount(expenseEdit.amount)
    }, [state.editingId])


    const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (Object.values(expense).includes('')) {
            setError('Todos los campos son obligatorios')
            return
        }

        if((expense.amount - previusAmount) > remaining) {
            setError(`No hay suficiente presupuesto, disponible: $${remaining}`)
            return
        }

        setError('');
        if (state.editingId) {
            dispatch({ type: 'update-expense', payload: { expense: { id: state.editingId, ...expense} } })
            
        } else {
            dispatch({ type: 'add-expense', payload: { expense } })
        }

        setExpense({
            expenseName: '',
            amount: 0,
            expectedamount: 0,
            category: '',
            date: new Date()
        })
        setPreviusAmount(0)
     
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <legend className="text-2xl font-black uppercase text-center border-b-4 border-teal-500 py-2">
                {state.editingId ? 'Editar gasto' : 'Nuevo gasto'}
            </legend>

            {error && <ErrorMenssage>{error}</ErrorMenssage>}
            <div className="flex flex-col space-y-2">
                <label htmlFor="expenseName" className="text-lg">Nombre de gasto:</label>
                <input
                    type="text"
                    id="expenseName"
                    name="expenseName"
                    className="w-full bg-white border border-gray-200 p-2 rounded"
                    placeholder="ej. Transporte"
                    onChange={handelChange}
                    value={expense.expenseName}
                />
            </div>

            <div className="flex flex-col space-y-2">
                <label htmlFor="amexpectedamountount" className="text-lg">Cantidad esperada:</label>
                <input
                    type="number"
                    id="expectedamount"
                    name="expectedamount"
                    className="w-full bg-white border border-gray-200 p-2 rounded"
                    placeholder="ej. 300"
                    onChange={handelChange}
                    value={expense.expectedamount}
                    min={0} />
            </div>

            <div className="flex flex-col space-y-2">
                <label htmlFor="amount" className="text-lg">Cantidad:</label>
                <input
                    type="number"
                    id="amount"
                    name="amount"
                    className="w-full bg-white border border-gray-200 p-2 rounded"
                    placeholder="ej. 300"
                    onChange={handelChange}
                    value={expense.amount}
                    min={0} />
            </div>

            <div className="flex flex-col space-y-2">
                <label htmlFor="category" className="text-lg">Categoria:</label>
                <select
                    id="category"
                    name="category"
                    className="w-full bg-white border border-gray-200 p-2 rounded"
                    onChange={handelChange}
                    value={expense.category}
                >
                    <option value="">---Seleccione---</option>
                    {categories.map((category) => (
                        <option
                            key={category.id}
                            value={category.id}
                        >
                            {category.name}
                        </option>
                    ))}

                </select>
            </div>

            <div className="flex flex-col space-y-2">
                <label htmlFor="amount" className="text-lg">Fecha gasto:</label>
                <DatePicker className="w-full bg-white border border-gray-200 p-2 rounded" onChange={handelChangeDate} value={expense.date} />
            </div>

            <input type="submit" value={state.editingId ? 'Editar gasto' : 'Añadir gasto'} className="w-full font-black rounded uppercase bg-teal-700 text-white p-2 hover:bg-teal-800 cursor-pointer" />
        </form>
    )
}
