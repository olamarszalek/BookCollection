import { FC } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Tooltip,
} from "@mui/material";
import styles from "./BookCard.module.scss";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ShowMoreText } from "../ShowMoreText/ShowMoreText";
import { useNavigate } from "react-router-dom";

interface PropsBookCard {
  title: string;
  CSSClass: string;
  bio?: string;
  author: string;
  description: string;
  children?: JSX.Element | JSX.Element[];
  collapse?: boolean;
  isBackArrow?: boolean;
  imgSRC?: string;
  rating: number[];
}

export const BookCard: FC<PropsBookCard> = ({
  title,
  CSSClass,
  bio,
  author,
  description,
  children,
  collapse,
  isBackArrow,
  imgSRC,
  rating
}) => {
  const navigate = useNavigate();
  const ratingValue =
    rating.length > 0
      ? Math.round(
          rating.reduce((pre, current) => pre + current, 0) / rating.length
        )
      : "No rating";

  const tooltip = () => {
    return bio ? (
      <>
        <Tooltip
          title={
            <Typography variant="body2" sx={{ fontSize: 10 }}>
              {bio}
            </Typography>
          }
          className={styles.tooltipMain}
        >
          <Typography variant="h5" component="h5">
            Author: {author.toUpperCase()}
          </Typography>
        </Tooltip>
        <Typography variant="h6">
          <span> {title.toUpperCase()} rating </span> {ratingValue}
        </Typography>
      </>
    ) : (
      <>
        <Typography variant="h5" component="h5">
          Author: {author?.toUpperCase()}
        </Typography>
        <Typography variant="h6">
          <span> {title} rating </span> {ratingValue}
        </Typography>
      </>
    );
  };

  const collapseFn = () => {
    if (collapse) {
      return <ShowMoreText text={description} />;
    } else {
      return (
        <Typography variant="body2" color="text.secondary" sx={{ margin: 1 }}>
          {description}
        </Typography>
      );
    }
  };

  return (
    <div>
      {isBackArrow && (
        <Button
          variant="text"
          startIcon={<ArrowBackIcon />}
          color="inherit"
          onClick={() => navigate(-1)}
        >
          Return
        </Button>
      )}
      <Card className={styles.bodyCardBook}>
        <CardMedia
          className={styles[CSSClass]}
          component="img"
          sx={{ width: 200 }}
          alt={`Book cover ${title}`}
          image={imgSRC}
        />
        <CardContent>
          <Typography variant="h5" component="h5">
            Title: {title}
          </Typography>
          {tooltip()}
        </CardContent>
        {collapseFn()}
        {!!{ children } && (
          <CardActions className={styles.cardActionBook}>
            {children}
          </CardActions>
        )}
      </Card>
    </div>
  );
};
