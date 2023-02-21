import { FC, useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getOneBook, deleteBook, editBook } from "../../services/books.service";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Rating,
  Stack,
  TextField,
} from "@mui/material";

import { BookCard } from "../../components/BookCard/BookCard";
import styles from "./OneBook.module.scss";

export const OneBook: FC = () => {
  interface BookInterface {
    id: number;
    title: string;
    author: string;
    description: string;
    years: number;
    rating: number[];
    url?: string;
  }

  const [book, setBook] = useState<BookInterface>({} as BookInterface);

  const [showRating, setShowRating] = useState(true);
  const [ratingValue, setRatingValue] = useState(5);
  const [isBookEdited, setIsBookEdited] = useState(false);

  const editTitle = useRef<HTMLInputElement>();
  const editDescription = useRef<HTMLTextAreaElement>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getOneBookFetch = () => {
      if (id) {
        const book = getOneBook(id);
        book
          .then((item) => {
            setBook(item.data);
          })
          .catch((err) => {
            console.error(err);
          });
      }
    };

    getOneBookFetch();
    return () => {
      console.log("unmounts");
    };
  }, [id, showRating, isBookEdited]);
  const deletedBook = (id: number) => {
    deleteBook(id.toString())
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        navigate("/all");
      });
  };
  const addRating = (payload: any) => {
    payload.rating.push(ratingValue);

    const newPayload = { ...payload };

    console.log(newPayload);

    editBook(newPayload)
      .then((res) => console.log(res))
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
    setShowRating(false);
  };

  const editBookFc = (payload: any) => {
    const title =
      editTitle.current?.value !== "" ? editTitle.current?.value : book.title;
    const description =
      editDescription.current?.value !== ""
        ? editDescription.current?.value
        : book.description;
    const newPayload = { ...payload, title, description };
    console.log(newPayload);
    editBook(newPayload)
      .then((res) => {
        setIsBookEdited(false);
        console.log(res);
      })
      .catch((e) => console.log(e));
  };
  return (
    <>
      {!isBookEdited && (
        <BookCard
          title={book.title}
          CSSClass={"px150"}
          author={book.author}
          description={book.description}
          isBackArrow={true}
          imgSRC={book.url}
          rating={book.rating || []}
        >
          <Button
            size="small"
            disabled={!showRating}
            onClick={() => addRating(book)}
          >
            Add your rating
          </Button>
          <Button
            size="small"
            color="warning"
            onClick={() => setIsBookEdited(true)}
          >
            Press to edit
          </Button>
          <Button
            size="small"
            color="error"
            onClick={() => deletedBook(book.id)}
          >
            Delete
          </Button>
        </BookCard>
      )}
      {(showRating && !isBookEdited) && <>
      <h2>Add your rating</h2>
      <Stack>
        <Rating name="size-large" value={ratingValue} max={10} size="large" onChange={(event, value) => {setRatingValue(value || 1)}}/>
      </Stack>
      </>}
      {isBookEdited &&
      <>
      <Box className={styles.blockPadding}>
        <FormControl sx={{marginBottom: 4}}>
            <InputLabel htmlFor="edit-title">Title</InputLabel>
            <Input id="edit-title" placeholder={book.title} inputRef={editTitle}/>
            <FormHelperText id="my-helper-text">Previous value is {book.title}</FormHelperText>
        </FormControl>
        <TextField 
        id="edit-description"
        label="Book description"
        variant="standard"
        multiline
        maxRows={10}
        helperText={"Previous description: " + book.description}
        inputRef={editDescription}
        />
      </Box>
      <Button size="small" color="success" onClick={() => editBookFc(book)}>Save changes</Button>
      
      </>}

    </>
  );
};
