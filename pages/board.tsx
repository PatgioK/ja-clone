import React, { useEffect, useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import { Header } from '../components/layout/Header';
import { Row } from 'react-bootstrap'
import { TaskComponent } from '../components/taskComponent';

const AllTasksQuery = gql`
    query {
        tasks{
            id
            title
            description
        }
    }
`

const sections: Array<String> = ['Back-log', 'In Progress', 'Review', 'Done']

const Board = () => {
    const { data, loading, error } = useQuery(AllTasksQuery, {
      onCompleted: data => {
        console.log(data.tasks)
      }
    });
  return (<>
    <div className='d-flex flex-column h-100 pt-3'>
        <Row>
            <h1>project title</h1>
        </Row>
        <div className="board-container d-flex flex-row flex-grow-1">
            {data && data.tasks.map((task: Task) => {
                return (
                    <TaskComponent 
                    title={task.title} 
                    id={task.id}
                    description={task.description}
                    key={task.id}
                    />
                )
            })}
        </div>
    </div>
    </>
  )
}

export default Board;


