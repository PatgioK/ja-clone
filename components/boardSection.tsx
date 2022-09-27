
import React from 'react'
import { TaskComponent } from './taskComponent'
import { Button, Col, Card, Form, Container } from 'react-bootstrap'

interface BoardSectionProps {
    title: string
    tasks?: Task[]
}

export const boardSection = (props: BoardSectionProps) => {
    return (
        <>
            <Col md={3} className='d-flex flex-column p-2'>
                <div className="board-section-header d-flex flex-row align-items-center">
                    <h3>{props.title}</h3>
                </div>
            </Col>
        </>
    )
}
