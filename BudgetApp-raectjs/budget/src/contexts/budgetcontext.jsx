import { createContext, useContext, useState } from "react";
import { Prev } from "react-bootstrap/esm/PageItem";
import { v4 as uuid } from 'uuid';
import useLocalStorage from "../components/useLocalStorage"

const BudgetContext = createContext()

export const UNCATEGORIZED_BUDGET_ID = "uncategorized"

export function useBudgets(){
    return useContext(BudgetContext)

}

export function BudgetProvider({children}){
    const [budgets  , setBudget] = useLocalStorage ("budgets" ,[])
    const [expenses , setExpenses] = useLocalStorage("expenses" ,[])

    function getBudgetExpenses( budgetId){
        return expenses.filter(expense => expense.budgetId === budgetId)

    }
    function addExpense({description , amount , budgetId}){
        setExpenses(prevExpenses =>{
            return [...prevExpenses ,{id: uuid() , description , amount , budgetId} ]
        })

    }
    function   addBudget ({name , max}){
        setBudget(prevBudgets =>{
            if(prevBudgets.find(budget => budget.name === name)){
            return prevBudgets;
            }
            return [...prevBudgets , { id:uuid(), name: name , max :max}]
        })

    }

    function  deleteBudget({id}){
        setExpenses(prevExpenses =>{
            return prevExpenses.map(expense =>{
                if( expense.budgetId !== id ) return expense
                return { ...expense , budgetId :UNCATEGORIZED_BUDGET_ID }
            })
        })
        setBudget(prevBudget =>{
            return prevBudget.filter(budget => budget.id !== id )
        }
            )

    }
    function deleteExpense({id}){
        const newExpenses = expenses.filter(expense => expense.id !== id)
        setExpenses(newExpenses)

    }
    return(
        <BudgetContext.Provider value ={{
            budgets,
            expenses ,
            getBudgetExpenses , 
            addExpense , 
            addBudget ,
            deleteBudget ,
            deleteExpense

        }} >
             {children}

        </BudgetContext.Provider>
       

    )
}