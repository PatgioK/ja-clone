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

const AllUsersQuery = gql`
query {
    users{
        id
        name
    }
}
`

export const AddTaskModal = ({ showModal, handleClose, boardCategory }: { boardCategory: String, showModal: boolean, handleClose: () => void }) => {
    const [taskTitle, setTaskTitle] = useState('')
    const [taskDesc, setTaskDesc] = useState('')
    const [assignTo, setAssignTo] = useState('')

    const { data: usersData, loading: usersLoading} = useQuery(AllUsersQuery);

    const [createTask, { data, loading, error }] = useMutation(CreateTaskMutation, {
        onCompleted: (data) => {
            setTaskTitle('');
            setTaskDesc('');
            setAssignTo('');
        }
    })

    const handleTaskCreate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let userId = '';
        if(assignTo) {
            userId = assignTo;
        } else if (usersData) {
            userId = usersData.users[0].id;
        }
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
                <Form onSubmit={(e) => handleTaskCreate(e)}>
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
                        <Form.Select value={assignTo} onChange={(e) => setAssignTo(e.target.value)}>
                            {
                                usersData &&
                                usersData.users.map((user: User) => {
                                    return(
                                        <option value={user.id} key={user.id}>{user.name}</option>
                                    )
                                })
                            }
                        </Form.Select>
                    </Form.Group>
                    <Button variant="primary" type='submit'>Submit</Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}
