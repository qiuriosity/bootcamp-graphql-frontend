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

  const [addAuthor, {
    loading: addAuthorLoading,
    error: addAuthorError,
  }] = useMutation(ADD_AUTHOR, {
    update: (client, { data }) => {
      try {
        const temp = client.readQuery({ query: ALL_AUTHORS })
        temp.allAuthors = [...temp.allAuthors, data.addAuthor]

        client.writeQuery({ query: ALL_AUTHORS, temp })
      } catch (err) {
        throw new Error('query failed')
      }
    },
    variables: {
      authorInput: {
        firstName: 'Emily',
        lastName: 'Qiu',
      },
    },
  })

  if (allAuthorsError) {
    return <p>{allAuthorsError.graphQLErrors[0].message}</p>
  }

  if (addAuthorError) {
    return <p>{addAuthorError.graphQLErrors[0].message}</p>
  }

  return (
    <>
      <h1>authors</h1>
      <button onClick={addAuthor}>add me</button>
      {allAuthorsLoading || addAuthorLoading ? 'loading...' : allAuthorsData.allAuthors.map(author => (
        <>
          <p key={author.id}>{`${author.firstName} ${author.lastName}`}</p>
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
