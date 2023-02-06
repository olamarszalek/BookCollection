import styles from "./All.module.scss";
import { useEffect, useContext, FC } from "react";
import { getBooks, getAuthors } from "../../services/books.service";
import { GlobalState } from "../../Store/GlobalStore";
import { useNavigate } from "react-router";
import { BookCard } from "../../components/BookCard/BookCard";
import { Grid, Button, Alert, Snackbar } from "@mui/material";


export const All: FC = () => {
  const global = useContext(GlobalState);
  const navigate = useNavigate();
  const getAllBooks = async () => {
    try {
      const books = await getBooks();
      await global.globalGetBooks(books.data);
    } catch {
      {
        <p>Books are not accessible</p>;
      }
    }
  };

  const getAllAuthors = async () => {
    const authors = await getAuthors();
    await global.globalGetAuthors(authors.data);
  };

  useEffect(() => {
    getAllBooks();
    getAllAuthors();
  }, []);

  const howManyCards = global.globalBooks.length <= 2 ? 6 : 4;

  const booksWithAuthorsBio = global.globalBooks.map((book) => {
    const author = global.globalAuthors.find(
      (item) => item.author.toUpperCase() === BookCard.author.toUpperCase()
    );
    const bio = author ? author.bio : "No bio available";
    return { ...book, bio };
  });

  const showMore = (id: number, title: string): void => {
    navigate(`/${title}/${id}`);
  };

  const handleCloseSnackbar = () => {
    global.globalOpenSnackbarChange(false);
  };

  const showCardWithBook: JSX.Element[] = booksWithAuthorsBio.map((item) => {
    return (
      <Grid item xs={12} md={howManyCards} key={item.id}>
        <BookCard
          title={item.title}
          CSSClass="px150"
          author={item.author}
          description={item.description}
          bio={item.bio}
          collapse={true}
          imgSRC={item.url}
          rating={item.rating}
        >
          <Button onClick={() => showMore(item.id!, item.title)} size="small">
            Show details
          </Button>
        </BookCard>
      </Grid>
    );
  });

  return (
    <>
      <Grid>{showCardWithBook}</Grid>
      {global.globalAlertInfoSnackbar.addBook && (
        <Snackbar
          open={global.globalOpenSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={global.globalAlertInfoSnackbar.severity}
            sx={{ width: "100%" }}
          >
            {global.globalAlertInfoSnackbar.message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};
