import {FC, useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router'

import { getOneBook, deleteBook, editBook } from '../../services/books.service'
import { Box, Button, FormControl, FormHelperText, Input, InputLabel, Rating, Stack, TextField } from '@mui/material'

import { BookCard } from '../../components/BookCard/BookCard'
import styles from './OneBook.module.scss'

export const OneBook: FC = () => {
    interface BookInterface {
        id: number,
        title: string,
        author: string,
        description: string,
        years: number,
        rating: number[],
        url?: string
    }

    const [book, setBook] = useState<BookInterface>({} as BookInterface)

    const [showRating, setShowRating] = useState(true)
    const [ratingValue, setRatingValue] = useState(5)
    const [isBookEdited, setIsBookEdited] = useState(false)

    const editTitle = useRef<HTMLInputElement>()
    const editDescription = useRef<HTMLTextAreaElement>()
    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const getOneBookFetch = () => {
            if (id) {
                const book = getOneBook(id)
                book.then(item => {
                    setBook(item.data)
                }).catch((err) => {
                    console.error(err)
                })
            }
        }

getOneBookFetch()
return () => {
    console.log('unmounts')
}
        }, [id, showRating, isBookEdited])
    }
