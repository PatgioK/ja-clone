import React, { useEffect, useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import { Header } from '../components/layout/Header';

const AllTasksQuery = gql`
    query {
        tasks{
            id
            title
            description
        }
    }
`


const Board = () => {
    const { data, loading, error } = useQuery(AllTasksQuery, {
      onCompleted: data => {
        console.log(data.tasks)
      }
    });
  return (<>
    <div>board</div>
    </>
  )
}

export default Board;


