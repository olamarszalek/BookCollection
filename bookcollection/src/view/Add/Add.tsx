import { FormEvent, FC, useRef, useState, useContext, useEffect } from "react";
import { Alert, Box, Button, FormControl, FormHelperText, Input, InputLabel, Snackbar, TextField, Typography, Modal } from '@mui/material'
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import styles from '.Add.module.scss';
import uniqid from 'uniqid';
import { addNewBook, getAuthors, addAuthor } from "../../services/books.service";
import { useNavigate } from "react-router";
import { BookInterface, Payload } from "../../Store/HelperInterface";
import { GlobalState } from "../../Store/GlobalStore";
import { debounce } from 'lodash';

const Add: FC = () => {

    const [datePickerValue, setDatePickerValue] = useState()

    const date = new Date().getFullYear().toLocaleString()

    const [isBookInvalid, setBookInvalid] = useState(true)

    const navigate = useNavigate()

    const form = useRef<HTMLCollection>()

    const createID = (uniqName: string) => {
        return `${uniqid()} ${uniqName}`
    }

    const global = useContext(GlobalState)

    const getAllAuthors = async () => {
        const authors = await getAuthors()
        await global.globalGetAuthors(authors.data)
    }

    useEffect(() => {
        getAllAuthors()
    }, [])

    const isObjectComplete = (obj: BookInterface): boolean => {
        const objKeys = Object.keys(obj)
        const isComplete = objKeys.every((item: string) => {
            return obj.author !== '' && obj.years !== undefined
        })
        return isComplete
    }

    const submitBook = (event: FormEvent) => {
        event.preventDefault()
        if(form.current && form.current !== null) {
        const onlyElForm = Array.from(form.current).filter(item => {
            if(item.id.search('author') > -1
            || item.id.search('title') > -1
            || item.id.search('describe') > -1
            || item.id.search('img-url') > -1
            ) {
                return item
            } else {
                return []
            }
        
        })
    }
}



