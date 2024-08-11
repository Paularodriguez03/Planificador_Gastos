import { ChangeEvent } from "react";
import { categories } from "../data/categories"
import { useBudget } from "../hooks/useBudget"

export const FilterByCategory = () => {

    const { dispatch } = useBudget();

    const handelChange = (e: ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        const { value } = e.target;
        dispatch({ type: 'add-filter-category', payload: { category: value } })

    }

    return (
        <div className="bg-white shadow-lg rounded-lg p-10">

            <form action="">
                <div className="flex flex-col md:flex-row md:items-center gap-5">
                    <label htmlFor="category">Filtrar gastos</label>
                    <select
                        name="category"
                        id="category"
                        className="w-full bg-white border border-gray-200 p-2 rounded"
                        onChange={handelChange}
                    >
                        <option value="">-- Seleccione una categoria --</option>
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
            </form>
        </div>
    )
}
