/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react'
import { useLazyQuery, useQuery } from '@apollo/react-hooks'
import { ALL_AUTHORS, ALL_BOOKS } from './graphql'

const Authors = () => {
  const {
    data: allAuthorsData,
    loading: allAuthorsLoading,
    error: allAuthorsError,
  } = useQuery(ALL_AUTHORS)

  if (allAuthorsError) {
    throw new Error('query failed')
  }

  return (
    <>
      <h1>authors</h1>
      {allAuthorsLoading ? 'loading...' : allAuthorsData.allAuthors.map(author => (
        <>
          <p>{author.firstName}</p>
          <p>{author.lastName}</p>
        </>
      ))}
    </>
  )
}

const Books = () => {
  const [
    getAllBooks, {
      data: allBooksData,
      loading: allBooksLoading,
      error: allBooksError,
      called: allBooksCalled,
    },
  ] = useLazyQuery(ALL_BOOKS)

  if (allBooksError) {
    throw new Error('query failed')
  }

  if (!allBooksCalled) {
    return (
      <button onClick={getAllBooks}>get books</button>
    )
  }

  return (
    <>
      <h1>books</h1>
      {allBooksLoading ? 'loading...' : allBooksData.allBooks.map(book => (
        <>
          <p>{book.title}</p>
        </>
      ))}
    </>
  )
}

const Home = () => {
  return (
    <>
      <Authors />
      <Books />
    </>
  )
}

export default Home
