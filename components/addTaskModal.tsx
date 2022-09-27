import React, { useState } from 'react'
import { Col, Button, Card, Form, Container, Modal } from 'react-bootstrap'
import { gql, useMutation, useQuery } from '@apollo/client'


const CreateTaskMutation = gql`
mutation CreateTask($id: String, $title:String!, $description: String!, $status: String!, $userId: String) {
    createTask(id: $id, title: $title, description: $description, status: $status, userId: $userId) {
        id
        title
        description
        status
    }
}
`

export const AddTaskModal = ({
    showModal,
    handleClose,
    boardCategory
}: {
    boardCategory: String,
    showModal: boolean,
    handleClose: () => void
}) => {
    const [taskTitle, setTaskTitle] = useState('')
    const [taskDesc, setTaskDesc] = useState('')
    const [assignTo, setAssignTo] = useState('')

    const [createTask, { data, loading, error }] = useMutation(CreateTaskMutation, {
        onCompleted: (data) => {
            setTaskTitle('');
            setTaskDesc('');
            setAssignTo('');
        }
    })

    const handleTaskCreate = (e) => {
        e.preventDefault()
        createTask({
            variables: {
                title: taskTitle,
                description: taskDesc,
                status: boardCategory
            }
        })
        handleClose()
    }


    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title> Create A Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleTaskCreate}>
                    <Form.Group className='pb-3'>
                        <Form.Label>Title</Form.Label>
                        <Form.Control type='text' value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group className='pb-3'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control type='text' value={taskDesc} onChange={(e) => setTaskDesc(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group className='pb-3'>
                        <Form.Label>Assign To</Form.Label>
                        <Form.Control value={assignTo} onChange={(e) => setAssignTo(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Button variant="primary" type='submit'>Submit</Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}
