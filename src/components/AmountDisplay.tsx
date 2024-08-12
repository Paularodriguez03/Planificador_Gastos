import { formatCurrency } from "../helpers"

type AmountDisplayProps = {
    label?: string,
    amount: number
}
export const AmountDisplay = ({ label, amount }: AmountDisplayProps) => {
    return (
        <p className="flex-1 text-xl text-teal-600 font-medium"> {label  &&  `${label}: `}<span className="font-black text-black">{formatCurrency(amount)}</span></p>
    )
}
