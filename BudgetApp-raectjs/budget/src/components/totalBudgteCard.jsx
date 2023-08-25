import React from 'react'
import BudgetCard from './budjetcard'
import { useBudgets } from '../contexts/budgetcontext'

function TotalBudgteCard(props) {

    const { expenses ,  budgets } = useBudgets()
    const amount = expenses.reduce(
        (total , expense) => total+ expense.amount ,0
    )

    const max= budgets.reduce((total , budget) => total + budget.max , 0)
    if (max == 0) return null
  return (
    <BudgetCard name="Total" amount ={amount} max={max} hideButtons   {...props} />
  )
}

export default TotalBudgteCard
