
import React, { useState } from 'react'
import { Card, Form, Button, Modal } from 'react-bootstrap'
import { gql, useMutation, useQuery } from '@apollo/client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { Draggable } from 'react-beautiful-dnd'


const UpdateTaskMutation = gql`
mutation UpdateTaskMutation($id: String!, $title:String!, $description: String, $status: String!, $userId: String) {
    updateTask(id: $id, title: $title, description: $description, status: $status, userId: $userId) {
        id
        title
        description
        status
    }
}
`
const DeleteTaskMutation = gql`
mutation DeleteTaskMutation($id: String!){
    deleteTask(id: $id){
        id
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

export const TaskComponent: React.FC<Task> = ({ title, description, id, status, boardCategory, index }) => {
    const [taskTitle, setTaskTitle] = useState(title)
    const [taskDesc, setTaskDesc] = useState(description)
    const [assignTo, setAssignTo] = useState('')
    const [showModal, setShowModal] = useState(false)

    const { data: usersData, loading: usersLoading} = useQuery(AllUsersQuery);

    const [updateTask, { data, loading, error }] = useMutation(UpdateTaskMutation, {
        onCompleted(data) {
            setTaskTitle('')
            setTaskDesc('')
            setAssignTo('')
        },
    })

    const [deleteTask] = useMutation(DeleteTaskMutation)

    const handleClose = () => {
        setShowModal(false)
    }

    const handleShow = () => {
        setShowModal(true);
    }

    const handleTaskUpdate = (e) => {
        e.preventDefault()

        let userId = '';
        if(assignTo) {
            userId = assignTo;
        } else if (usersData) {
            userId = usersData.users[0].id;
        }

        updateTask({
            variables: {
                title: taskTitle,
                description: taskDesc,
                id: id,
                status: boardCategory
            }
        })
        handleClose()
    }

    const handleTaskDelete = (e) => {
        deleteTask({
            variables: {
                id: id
            }
        })
        handleClose()
    }

    return (
        <>
            <Draggable draggableId={id} index={index} >
                {(provided) => (
                    <Card className='task-container' onClick={handleShow} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                        <Card.Body>{title}</Card.Body>
                    </Card>
                )}
            </Draggable>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title> Update A Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleTaskUpdate}>
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
                        <div className='d-flex justify-content-between'>
                            <Button variant="primary" type='submit'>Update</Button>
                            <Button onClick={handleTaskDelete}><FontAwesomeIcon icon={faTrash} style={{ color: '#44AAAA' }} />Delete</Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}
