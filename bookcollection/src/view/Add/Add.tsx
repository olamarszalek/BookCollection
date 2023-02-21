import { FormEvent, FC, useRef, useState, useContext, useEffect } from "react";
import {
  Alert,
  Box,
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Snackbar,
  TextField,
  Typography,
  Modal,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import styles from "./Add.module.scss";
import uniqid from "uniqid";
import {
  addNewBook,
  getAuthors,
  addAuthor,
} from "../../services/books.service";
import { useNavigate } from "react-router-dom";

import { GlobalState, BookInterface } from "../../Store/GlobalStore";
import { debounce } from "lodash";
import moment, { Moment } from "moment";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

const Add: FC = () => {
  const date = new Date().getFullYear().toLocaleString();

  const [datePickerValue, setDatePickerValue] = useState<Moment | null>(
    moment(date)
  );

  const maxDate = moment(date);

  const [isBookInvalid, setBookInvalid] = useState(true);

  const navigate = useNavigate();

  const form = useRef<HTMLCollection>();

  const createID = (uniqName: string) => {
    return `${uniqid()} ${uniqName}`;
  };

  const global = useContext(GlobalState);

  const getAllAuthors = async () => {
    const authors = await getAuthors();
    await global.globalGetAuthors(authors.data);
  };

  useEffect(() => {
    getAllAuthors();
  }, []);

  const isObjectComplete = (obj: BookInterface): boolean => {
    const objKeys = Object.keys(obj);
    const isComplete = objKeys.every((item: string) => {
      return obj.author !== "" && obj.years !== undefined;
    });
    return isComplete;
  };

  const submitBook = (event: FormEvent) => {
    event.preventDefault();
    if (form.current && form.current !== null) {
      const onlyElForm = Array.from(form.current).filter((item) => {
        if (
          item.id.search("author") > -1 ||
          item.id.search("title") > -1 ||
          item.id.search("describe") > -1 ||
          item.id.search("img-url") > -1
        ) {
          return item;
        } else {
          return [];
        }
      });

      const payload: BookInterface = {
        author: (onlyElForm[0] as HTMLInputElement).value,
        title: (onlyElForm[1] as HTMLInputElement).value,
        description: (onlyElForm[2] as HTMLInputElement).value,
        years: datePickerValue?.year(),
        rating: [5],
        url: (onlyElForm[3] as HTMLInputElement).value,
      };

      const isValid = isObjectComplete(payload);
      setBookInvalid(isValid);

      if (isValid) {
        addNewBook(payload)
          .then((response) => {
            global.globalAlertInfoSnackbarChange({
              severity: "success",
              message: `${payload.title} by ${payload.author} is added.`,
              addBook: true,
            });
            global.globalOpenSnackbarChange(true);
            console.log(response);
          })
          .catch((err) => {
            global.globalAlertInfoSnackbarChange({
              severity: "error",
              message: `Error occurred while adding ${payload.title} by ${payload.author}.`,
            });
            global.globalOpenSnackbarChange(true);
            console.log(err);
          })
          .finally(() => {
            navigate("/all");
          });
      } else {
        setBookInvalid(isValid);
      }
    }
  };
  const idAuthor = createID("author");
  const idTitle = createID("title");
  const idDescription = createID("description");
  const idImg = createID("img-url");

  const [open, setOpen] = useState(false);
  const [newAuthor, setNewAuthor] = useState("");
  const authorName = useRef<HTMLInputElement>();
  const authorBio = useRef<HTMLInputElement>();

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const saveBio = () => {
    const payload = {
      author: newAuthor,
      bio:
        authorBio.current?.value !== ""
          ? authorBio.current?.value
          : `No data about ${newAuthor}`,
    };

    addAuthor(payload)
      .then((res) => {
        global.globalAlertInfoSnackbarChange({
          severity: "success",
          message: `${payload.author}'s bio was added.`,
          addBook: false,
        });
        global.globalOpenSnackbarChange(true);
      })
      .catch((err) => {
        global.globalAlertInfoSnackbarChange({
          severity: "error",
          message: `Couldn't save author: ${payload.author}`,
        });
        global.globalOpenSnackbarChange(true);
      });
    setOpen(false);
  };
  const checkInput = () => {
    const authorNameInputVal = (
      authorName.current?.children[0] as HTMLInputElement
    ).value;
    const isAuthor = global.globalAuthors.some(
      (item) => item.author.toUpperCase() === authorNameInputVal.toUpperCase()
    );
    if (!isAuthor) {
      setNewAuthor(authorNameInputVal);
      setOpen(true);
    }
  };
  const handleCloseSnackbar = () => {
    global.globalOpenSnackbarChange(false);
  };
  return (
    <>
      <Box component="form" className={styles.blockPadding} ref={form}>
        <FormControl>
          <InputLabel htmlFor={idAuthor}>Author</InputLabel>
          <Input
            id={idAuthor}
            ref={authorName}
            onChange={debounce(checkInput, 1000)}
          />
          <FormHelperText id="my-helper-text">
            First and Last Name
          </FormHelperText>
        </FormControl>
        <FormControl>
          <InputLabel htmlFor={idTitle}>Book Title</InputLabel>
          <Input id={idTitle} />
          <FormHelperText id="my-helper-text">
            Provide Book Title
          </FormHelperText>
        </FormControl>

        <TextField
          is={idDescription}
          label="Book description"
          variant="standard"
          multiline
          maxRows={10}
        />

        <div className={styles.WrapperDataPicker}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              views={["year"]}
              label="Publishing date"
              className={styles.datePicker}
              value={datePickerValue}
              maxDate={maxDate}
              onChange={(newValue) => {
                const val = newValue ? newValue : moment(date);
                setDatePickerValue(val);
              }}
              renderInput={(params) => (
                <TextField {...params} helperText={null} />
              )}
            />
          </LocalizationProvider>
        </div>

        <FormControl>
          <InputLabel htmlFor={idImg}>Photo URL</InputLabel>
          <Input id={idImg} aria-describedby="my-helper-text" />
          <FormHelperText id="my-helper-text">
            Paste photo URL here
          </FormHelperText>
        </FormControl>
        {!isBookInvalid && <p>Form filled incorrectly</p>}
        <div className={styles.wrapperButton}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={styles.button}
            onClick={(event) => submitBook(event)}
          >
            Save
          </Button>
        </div>
      </Box>
      <Modal open={open}>
        <Box sx={style}>
        <Typography variant ="h6">Add bio for: {newAuthor}</Typography>
        <TextField 
        id="bio"
        label="Author's bio"
        variant="standard"
        inputRef={authorBio}
        multiline
        fullWidth
        maxRows={10}
        />
        <Button color="primary" onClick={saveBio}>Save</Button>
        </Box>
      </Modal>
      {!global.globalAlertInfoSnackbar.addBook && <Snackbar open={global.globalOpenSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
       <Alert onClose={handleCloseSnackbar} severity={global.globalAlertInfoSnackbar.severity} sx={{width: "100%"}}>
        {global.globalAlertInfoSnackbar.message}
        </Alert> 
      </Snackbar>}
    </>
  );
};

export default Add