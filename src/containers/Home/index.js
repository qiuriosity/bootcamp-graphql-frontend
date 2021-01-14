/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react'
import { useLazyQuery, useQuery, useMutation } from '@apollo/react-hooks'
import { ALL_AUTHORS, ALL_BOOKS, ADD_AUTHOR } from './graphql'

const Authors = () => {
  const {
    data: allAuthorsData,
    loading: allAuthorsLoading,
    error: allAuthorsError,
  } = useQuery(ALL_AUTHORS)

  if (allAuthorsError) {
    throw new Error('query failed')
  }

  const [addAuthor, {
    loading: addAuthorLoading,
    error: addAuthorError,
  }] = useMutation(ADD_AUTHOR, {
    update: (client, { data }) => {
      try {
        const prev = client.readQuery({ query: ALL_AUTHORS })
        prev.allAuthors = [...prev.allAuthors, data.createAuthor]

        client.writeQuery({ query: ALL_AUTHORS, prev })
      } catch (err) {
        throw new Error('query failed')
      }
    },
    variables: {
      authorInput: {
        firstName: 'Emily',
        lastName: 'Qiu',
        age: 18,
        email: 'someemail@gmail.com',
        numBooksPublished: 2,
      },
    },
  })

  if (addAuthorError) {
    throw new Error('error')
  }

  return (
    <>
      <h1>authors</h1>
      <button onClick={addAuthor}>add me</button>
      {allAuthorsLoading || addAuthorLoading ? 'loading...' : allAuthorsData.allAuthors.map(author => (
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

const Home = () => (
  <>
    <Authors />
    <Books />
  </>
)

export default Home
