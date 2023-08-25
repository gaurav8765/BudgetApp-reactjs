import React from 'react'
import { Form  , Button  , Modal} from 'react-bootstrap'
import { useRef } from 'react'
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from '../contexts/budgetcontext'

function AddExpensesModel({show , handleClose , defaultBudgetId}) {
    const descriptionRef = useRef()
    const amountRef = useRef()
    const budgetIdRef = useRef()
    const {addExpense , budgets } = useBudgets()

    function handleSubmit(e){
        e.preventDefault()

        addExpense(
            {
                description: descriptionRef.current.value ,

                amount: parseFloat(amountRef.current.value),
                budgetId : budgetIdRef.current.value ,
            }
        )
        handleClose()
    }

  return (
    <Modal show={show}  onHide ={handleClose} >
        <Form  onSubmit={handleSubmit} >
            <Modal.Header clodeButton >
                <Modal.Title>
                    New Expense
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form.Group controlId="description" className='mb-3' >
                    <Form.Label>
                        Description
                    </Form.Label>
                    <Form.Control ref={descriptionRef} type ="text" required></Form.Control>
                </Form.Group>
                <Form.Group controlId="amount" className='mb-3' >
                    <Form.Label>
                        Amount
                    </Form.Label>
                    <Form.Control  ref={amountRef} type ="number" min={0} step={0.01} required></Form.Control>
                </Form.Group>

                <Form.Group controlId="budgetId" className='mb-3' >
                    <Form.Label>
                        Budget
                    </Form.Label>
                    <Form.Select  ref={budgetIdRef} defaultValue={defaultBudgetId}>
                        <option  id={UNCATEGORIZED_BUDGET_ID}>uncategorized</option>
                        { budgets.map(budget =>(
                            <option key={budget.id} value={budget.id} >  
                                {budget.name}
                            </option>

                        ) )}

                    </Form.Select>
                </Form.Group>

                <div className='d-flex justify-content-end' >
                    <Button variant="primary" type="submit" >Add</Button>
                </div>
            </Modal.Body>

        </Form>

    </Modal>

  )
}

export default AddExpensesModel