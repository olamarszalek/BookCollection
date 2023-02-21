import { AlertColor } from '@mui/material'
import {useState, createContext, FC } from 'react'


export interface BookInterface {
  id?: number,
  title: string,
  author: string,
  description: string,
  years?: number,
  rating: number[],
  url?: string
}

export interface AuthorInterface {
  author: string,
  books?: string[],
  bio: string
}
export interface AlertInfoSnackbar {
  severity: AlertColor | undefined,
  message: string,
  addBook?: boolean
}
export interface GlobalStateInterface {
  globalBooks: BookInterface[],
  globalAuthors: AuthorInterface[],
  globalOpenSnackbar: boolean
  globalGetBooks: (data: BookInterface[]) => void
  globalGetAuthors: (data: AuthorInterface[]) => void
  globalAlertInfoSnackbar: AlertInfoSnackbar,
  globalOpenSnackbarChange: (payload: boolean)=> void,
  globalAlertInfoSnackbarChange: (payload: AlertInfoSnackbar) => void
}

export interface GlobalStoreInterface {
  children : JSX.Element | JSX.Element[]
}

export const GlobalState = createContext<GlobalStateInterface>({
    globalBooks: [],
    globalAuthors: [],
    globalGetBooks: () => {},
    globalGetAuthors: () => {},
    globalOpenSnackbar: false,
    globalAlertInfoSnackbar: {
      severity: 'success',
      message: ''
    },
    globalOpenSnackbarChange: () => {},
    globalAlertInfoSnackbarChange: () => {}

})

export const GlobalStore:FC<GlobalStoreInterface> = (props) => {
const [books, setBooks] =useState<BookInterface[]>([])
const [authors, setAuthors] = useState<AuthorInterface[]>([])
const [openSnackbar, setOpenSnackbar] =useState(false)
const [alertInfoSnackbar, setAlertInfoSnackbar] = useState<AlertInfoSnackbar>({
  severity: 'success',
  message: ''
})
const getBooks = (data: BookInterface[]) => {
  setBooks(data)
}

const getAuthors = (data: AuthorInterface[]) => {
  setAuthors(data)
}

const handleGlobalOpenSnackbarChange = (payload: boolean) => {
  setOpenSnackbar(payload)
}

const handleGlobalAlertInfoSnackbarChange = ( payload: AlertInfoSnackbar) => {
  setAlertInfoSnackbar(payload)
}
  const providerValue = {
    globalBooks: books,
    globalAuthors: authors,
    globalGetBooks: getBooks,
    globalGetAuthors: getAuthors,
    globalOpenSnackbar: openSnackbar,
    globalAlertInfoSnackbar: alertInfoSnackbar,
    globalOpenSnackbarChange: handleGlobalOpenSnackbarChange,
    globalAlertInfoSnackbarChange: handleGlobalAlertInfoSnackbarChange
  }
  return (
    <GlobalState.Provider value={providerValue}>
      {props.children}
    </GlobalState.Provider>
  )
}