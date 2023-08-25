import React from 'react'
import { Button, Card, ProgressBar, Stack } from 'react-bootstrap'
import { currencyFormatter } from '../utils.jsx'

function BudjetCard({name , amount , max  , gray , onAddExpenseClick , hideButtons
, onViewExpenseClick }) {
    const classNames =[]
    if (amount > max ){
        classNames.push("bg-danger" , "bg-opacity-10")
    }else if(gray){
        classNames.push("bg-light")
    }


  return (
    <Card className={classNames.join(" ")} >
        <Card.Body>
            <Card.Title  className='d-flex justify-content-between'>
                <div>{name}</div>
                <div>{ currencyFormatter.format (amount)} { max && <span>/</span>}{ max && currencyFormatter.format(max)}</div>
            </Card.Title>
            { max && <ProgressBar
            className='rounded-pill'
            min ={0}
            max = {max}
            now ={amount}
            variant={getProgressBarVariant(amount , max)}
            />}
             {!hideButtons && <Stack direction='horizontal' gap ="2" className='mt-4' >
                <Button variant='outline-primary'  onClick={onAddExpenseClick}>Add Expense</Button>
                <Button  onClick={onViewExpenseClick} variant='outline-secondry' >View Expense</Button>
            </Stack>}
        </Card.Body>
    </Card>
  )
}

export default BudjetCard

 function getProgressBarVariant(amount  , max){
    const ratio = amount  / max

    if (ratio < 0.5 ) return "primary"
    else if (ratio < 0.75  ) return "warning"
    else return "danger"

}


