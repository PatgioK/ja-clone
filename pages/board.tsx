import React, { useEffect, useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import { Header } from '../components/layout/Header';
import { Row } from 'react-bootstrap'
import { TaskComponent } from '../components/taskComponent';
import { BoardSection } from '../components/boardSection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'react-bootstrap'


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

const sections: Array<string> = ['Backlog', 'In Progress', 'Review', 'Done']

const Board = () => {
    const { data, loading, error } = useQuery(AllTasksQuery, {
      onCompleted: data => {
        console.log(data.tasks)
      }
    });

    if (loading) return <p>Loading</p>
    if (error) return <p>Error</p>
  return (<>
    <div className='d-flex flex-column h-100 pt-3'>
        <Row>
            <h1>project title</h1>
            <FontAwesomeIcon icon={faPlus} style={{color: '#6f7782'}} />
        </Row>
        <div className="board-container flex-row d-flex flex-row flex-grow-1">
            {sections.map((section: string, idx: number) => {
                let filteredData: Array<Task> = data ? data.tasks.filter((task:Task) => {return task.status===section}) : [];
                return(
                    <>
                    <BoardSection key={idx} title={section} tasks={filteredData} />
                    </>
                )
            })}
        </div>
    </div>
    </>
  )
}

export default Board;


