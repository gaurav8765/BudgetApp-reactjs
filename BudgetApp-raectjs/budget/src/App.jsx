
import { Button, Container, Stack } from "react-bootstrap"
import BudgetCard from "./components/budjetcard.jsx"
import AddBudgetModel from "./components/addBudgetModel.jsx"
import { useState } from "react"
import AddExpensesModel from "./components/addExpensesModel.jsx"
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "./contexts/budgetcontext.jsx"
import UncategorizedBudgetCard from "./components/uncategorizedBudgetCard.jsx"
import TotalBudgteCard from "./components/totalBudgteCard.jsx"
import ViewExpensesModal from "./components/viewExpensesModel.jsx"

function App() {
  const [showAddBudgetModal , setShowAddBudgetModal] = useState(false)
  const [showAddExpenseModal ,  setShowAddExpenseModal ] = useState(false)
  const [addExpenseModalBudgetId ,  setAddExpenseModalBudgetId ] = useState()
  const [viewExpensesModelBudgetId , setViewExpensesModelBudgetId ] = useState()
   const { budgets , getBudgetExpenses} = useBudgets()

  function openAddExpenseModal(budgetId){
    setShowAddExpenseModal(true)
    setAddExpenseModalBudgetId(budgetId)



  }
  

  return (
    <>
    <Container className="my-4" >
      <Stack direction="horizontal"  gap="2" mb="4">
        <h1 className="me-auto" >Budgets</h1>
        <Button variant="primary" onClick={() => setShowAddBudgetModal(true) } >Add Budget
        </Button>
        <Button variant="outline-primary" onClick={openAddExpenseModal} >Add expenses</Button>
      </Stack>
      <div
      style={{
        display:"grid" ,
        gridTemplateColoums :"repeat(auto-fill , minmax(300px , 1fr))" , 
        gap:"1rem" ,
        alignItems:"flex-start"      }}
      
      >
        {budgets.map(budget=>{
          const amount = getBudgetExpenses(budget.id).reduce(
            (total , expense) => total + expense.amount , 0


          )

          return(
            <BudgetCard
            key={budget.id}
            name = {budget.name}
            max={budget.max}
            amount ={amount}
            onAddExpenseClick ={() => openAddExpenseModal(budget.id) }
            onViewExpenseClick ={() => setViewExpensesModelBudgetId(budget.id)}
            />
          )
        } )}

        <UncategorizedBudgetCard onAddExpenseClick ={openAddExpenseModal } 
         onViewExpenseClick ={() => setViewExpensesModelBudgetId(UNCATEGORIZED_BUDGET_ID)}/>

         
        <TotalBudgteCard/>
        
        
        
      </div>
      

    </Container>
    <ViewExpensesModal
        budgetId= {viewExpensesModelBudgetId} 
        handleClose={()=>setViewExpensesModelBudgetId()}
        />
    <AddBudgetModel show ={showAddBudgetModal} handleClose={() => setShowAddBudgetModal(false)} />
    <AddExpensesModel
      defaultBudgetId={addExpenseModalBudgetId }
     show={showAddExpenseModal} 
      handleClose={() => setShowAddExpenseModal(false)}  />
    </>

  )
}

export default App
