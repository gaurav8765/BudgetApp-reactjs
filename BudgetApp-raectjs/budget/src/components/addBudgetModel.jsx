import React from 'react'
import { Form  , Button  , Modal} from 'react-bootstrap'
import { useRef } from 'react'
import { useBudgets } from '../contexts/budgetcontext'

function AddBudgetModel({show , handleClose}) {
    const nameRef = useRef()
    const maxRef = useRef()
    const  { addBudget} = useBudgets();

    function handleSubmit(e){
        e.preventDefault()

        addBudget(
            {
                name: nameRef.current.value ,

                max: parseFloat(maxRef.current.value),
            }
        )
        handleClose()
    }

  return (
    <Modal show={show}  onHide ={handleClose} >
        <Form  onSubmit={handleSubmit} >
            <Modal.Header clodeButton >
                <Modal.Title>
                    New budget
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form.Group controlId="name" className='mb-3' >
                    <Form.Label>
                        Name
                    </Form.Label>
                    <Form.Control ref={nameRef} type ="text" required></Form.Control>
                </Form.Group>

                <Form.Group controlId="name" className='mb-3' >
                    <Form.Label>
                        Maximum spending 
                    </Form.Label>
                    <Form.Control  ref={maxRef} type ="number" min={0} step={0.01} required></Form.Control>
                </Form.Group>

                <div className='d-flex justify-content-end' >
                    <Button variant="primary" type="submit" >Add</Button>
                </div>
            </Modal.Body>

        </Form>

    </Modal>

  )
}

export default AddBudgetModel
