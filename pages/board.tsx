import React, { useEffect, useState } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'
import { Header } from '../components/layout/Header';
import { Row } from 'react-bootstrap'
import { TaskComponent } from '../components/taskComponent';
import { BoardSection } from '../components/boardSection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'react-bootstrap'
import { DragDropContext } from 'react-beautiful-dnd'


const AllTasksQuery = gql`
    query {
        tasks{
            id
            title
            description
            status
        }
    }
`

const UpdateTaskMutation = gql`
mutation UpdateTaskMutation($id: String!, $title:String, $description: String, $status: String!, $userId: String) {
    updateTask(id: $id, title: $title, description: $description, status: $status, userId: $userId) {
        id
        title
        description
        status
    }
}
`

const sections: Array<string> = ['Backlog', 'In Progress', 'Review', 'Done']


const Board = () => {
    const [updateTask] = useMutation(UpdateTaskMutation)
    const { data, loading, error } = useQuery(AllTasksQuery, {
        onCompleted: data => {
            console.log(data.tasks)
        }
    });

    const onDragEnd = (result) => {
        const { destination, source, draggableId } = result
        console.log(result);
    
        if(!destination) return;
        if(destination.droppableId === source.droppableId) return;
    
        updateTask({
            variables: {
                id: draggableId,
                status:destination.droppableId
            }
        })
    }
    if (loading) return <p>Loading</p>
    if (error) return <p>Error</p>
    return (<>

        <div className='d-flex flex-column h-100 pt-3'>
            <Row>
                <h1>project title</h1>
                <FontAwesomeIcon icon={faPlus} style={{ color: '#6f7782' }} />
            </Row>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="board-container flex-row d-flex flex-row flex-grow-1">
                    {sections.map((section: string, idx: number) => {
                        let filteredData: Array<Task> = data ? data.tasks.filter((task: Task) => { return task.status === section }) : [];
                        return (
                            <>
                                <BoardSection key={idx} title={section} tasks={filteredData} />
                            </>
                        )
                    })}
                </div>
            </DragDropContext>
        </div>
    </>
    )
}

export default Board;


