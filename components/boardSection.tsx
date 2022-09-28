
import React, { useState } from 'react'
import { TaskComponent } from './taskComponent'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Button, Col, Card, Form, Container } from 'react-bootstrap'
import tasks from '../pages/api/tasks'
import { AddTaskModal } from './addTaskModal'
import { Droppable } from 'react-beautiful-dnd'

interface BoardSectionProps {
    title: string
    tasks?: Task[]
}

export const BoardSection = (props: BoardSectionProps) => {
    const [showModal, setShowModal] = useState(false)

    const handleClose = () => {
        setShowModal(false)
    }

    const handleShow = () => {
        setShowModal(true);
    }

    return (
        <>
            <Col md={3} className='d-flex flex-column p-2'>
                <div className="board-section-header d-flex flex-row align-items-center">
                    <h3>{props.title}</h3>
                    {/* <<FontAwesomeIcon icon="fa-solid fa-plus" /> */}
                </div>
                <Droppable droppableId={props.title} >
                    {(provided) => (
                        <Container
                            className='p-0 d-flex flex-column h-100'
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {props.tasks &&
                                props.tasks.map((task: Task, index: number) => {
                                    return (<>
                                        <TaskComponent
                                            title={task.title}
                                            id={task.id}
                                            description={task.description}
                                            key={task.id}
                                            boardCategory={props.title}
                                            index={index}
                                        />
                                    </>
                                    )
                                })
                            }

                            <Button className='add-wrapper' onClick={handleShow}>
                                <FontAwesomeIcon icon={faPlus} style={{ color: '#6f7782' }} />
                                Add Task
                            </Button>
                            {provided.placeholder}
                        </Container>
                    )}
                </Droppable>
            </Col>
            <AddTaskModal showModal={showModal} handleClose={handleClose} boardCategory={props.title} />
        </>
    )
}
