import { ChangeEvent, useMemo, useState } from "react"
import { useBudget } from "../hooks/useBudget"

export const BudgetForm = () => {

    const { dispatch } = useBudget()
    const [budget, setBudget] = useState(0);

    const handelChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setBudget(+e.target.value)
    }

    const isValid = useMemo(() => budget <= 0 || isNaN(budget), [budget]);


    const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch({ type: 'add-budget', payload: { budget } })
        setBudget(0)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">

            <div className="flex flex-col space-y-4">
                <label htmlFor="budget" className="text-4xl text-bold text-teal-700">Presupuesto</label>
                <input type="number" id="budget" name="budget"
                    className="w-full bg-white border border-gray-200 p-2"
                    placeholder="ej. 2000" min={0} value={budget} onChange={handelChange} />

            </div>
            <input type="submit" value={"Definir presupuesto"} disabled={isValid} className="w-full font-black uppercase bg-teal-700 text-white p-2 hover:bg-teal-800 cursor-pointer disabled:opacity-10" />
        </form>
    )
}
