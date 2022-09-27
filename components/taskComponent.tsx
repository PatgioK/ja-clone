
import React, { useState} from 'react'
import { Card, Form, Button } from 'react-bootstrap'

export const TaskComponent: React.FC<Task> = ({title, description, id, status}) => {
  return (
    <>
    <Card className='task-container'>
        {title}
        
    </Card>
    </>
  )
}
