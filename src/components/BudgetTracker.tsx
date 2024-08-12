import { AmountDisplay } from "./AmountDisplay";
import { useBudget } from "../hooks/useBudget";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useMemo } from "react";

export const BudgetTracker = () => {

  const { state, dispatch, totalExpenses, remaining, totalExpectedamount } = useBudget();

  const percentage = useMemo(() => {
    return +((totalExpenses / state.budget) * 100).toFixed(2);
  }, [state.budget, totalExpenses]);


  return (
    <div className="grid grod-cols-1 md:grid-cols-2 gap-5">
      <div className="flex justify-center">
        {/* <img src="/grafico.jpg" alt="Grafico de gastos" /> */}
        <CircularProgressbar
          value={percentage}
          styles={buildStyles({
            pathColor: percentage > 80 ? '#dc2626' : '#3d82f6',
            trailColor: '#f5f5f5',
            textColor:  percentage > 80 ? '#dc2626' : '#3d82f6',
            textSize: '8px',
          })}
          text={`${percentage} % Gastado`}
        />;
      </div>

      <div className="flex flex-col justify-center items-center gap-8">
        <button type="button" 
        className="bg-pink-600 text-white w-full p-2 uppercase rounded-lg"
        onClick={() => dispatch({ type: 'reset-app' })}>Resetear</button>

        <AmountDisplay label="Presupuesto" amount={state.budget} />
        <AmountDisplay label="Disponible" amount={remaining} />
        <AmountDisplay label="Monto Estimado" amount={totalExpectedamount} />
        <AmountDisplay label="Gastado" amount={totalExpenses} />

      </div>
    </div>
  )
}
