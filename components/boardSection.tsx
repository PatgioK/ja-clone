
import React from 'react'
import { TaskComponent } from './taskComponent'

import { Button, Col, Card, Form, Container } from 'react-bootstrap'
import tasks from '../pages/api/tasks'

interface BoardSectionProps {
    title: string
    tasks?: Task[]
}

export const BoardSection = (props: BoardSectionProps) => {
    return (
        <>
            <Col md={3} className='d-flex flex-column p-2'>
                <div className="board-section-header d-flex flex-row align-items-center">
                    <h3>{props.title}</h3>
                    {/* <<FontAwesomeIcon icon="fa-solid fa-plus" /> */}
                </div>
                <Container className='p-0 d-flex flex-column h-100'>
                    { props.tasks && 
                    props.tasks.map((task: Task, index: number) => {
                        return (
                            <TaskComponent 
                            title={task.title} 
                            id={task.id}
                            description={task.description}
                            key={task.id}
                            />
                        )
                    })
                    }
                </Container>
            </Col>
        </>
    )
}
