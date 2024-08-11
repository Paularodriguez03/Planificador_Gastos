import { category, DraftExpense, Expense } from "../types";
import { v4 as uuidv4 } from 'uuid';

export type ButgetActions =
    { type: 'add-budget', payload: { budget: number } } |
    { type: 'show-modal' } |
    { type: 'hide-modal' } |
    { type: 'add-expense', payload: { expense: DraftExpense } } |
    { type: 'delete-expense', payload: { id: Expense['id'] } } |
    { type: 'edit-expense', payload: { id: Expense['id'] } } |
    { type: 'update-expense', payload: { expense: Expense } } |
    { type: 'reset-app' } |
    { type: 'add-filter-category', payload: { category: category['id'] } }


export type ButgetState = {
    budget: number;
    modal: boolean;
    expenses: Expense[];
    editingId: Expense['id'];
    currentFilter: category['id'];
}

const initialButget = () => {
    const localStorageBudget = localStorage.getItem('budget')
    return localStorageBudget ? JSON.parse(localStorageBudget) : 0
}

const localSotageExpense = () => {
    const localStorageExpenses = localStorage.getItem('expenses')
    return localStorageExpenses ? JSON.parse(localStorageExpenses) : []
}

export const budgetInitialState: ButgetState = {
    budget: initialButget(),
    modal: false,
    expenses: localSotageExpense(),
    editingId: '',
    currentFilter: ''
}

const creareExpense = (draftExpense: DraftExpense): Expense => {

    return {
        id: uuidv4(),
        ...draftExpense
    }
}

export const budgetReducer = (state: ButgetState, action: ButgetActions) => {

    if (action.type === 'add-budget') {

        return {
            ...state,
            budget: action.payload.budget
        }
    }

    if (action.type === 'show-modal') {
        return {
            ...state,
            modal: true
        }
    }

    if (action.type === 'hide-modal') {
        return {
            ...state,
            modal: false,
            editingId: '',
        }
    }

    if (action.type === 'add-expense') {

        const expense = creareExpense(action.payload.expense)
        return {
            ...state,
            // expenses: [...state.expenses, { ...action.payload.expense, id: uuidv4() }]
            expenses: [...state.expenses, expense],
            modal: false
        }
    }

    if (action.type === 'delete-expense') {

        const expenseFind = state.expenses.filter(expense => expense.id !== action.payload.id);
        return {
            ...state,
            expenses: expenseFind
        }
    }

    if (action.type === 'edit-expense') {
        return {
            ...state,
            editingId: action.payload.id,
            modal: true
        }
    }

    if (action.type === 'update-expense') {
        return {
            ...state,
            expenses: state.expenses.map(expense => expense.id === action.payload.expense.id ? action.payload.expense : expense),
            editingId: '',
            modal: false
        }
    }

    if (action.type === 'reset-app') {
        return {
            ...state,
            budget: 0,
            expenses: [],
        }
    }

    if (action.type === 'add-filter-category') {
        return {
            ...state,
            currentFilter: action.payload.category
        }
    }

    return state

}