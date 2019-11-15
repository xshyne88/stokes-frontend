import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    height: 500
  },
  grid: {
    [theme.breakpoints.up("sm")]: {
      backgroundColor: "blue"
    }
  }
}));

export default function CenteredGrid() {
  const classes = useStyles();
  const matches = useMediaQuery("(min-width:600px)");

  return (
    <Container className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} clasName={classes.grid}>
          <Paper className={classes.paper}>xs=12</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
/*
 * export const Container = styled.div`
 *   max-width: ${({ theme }) => theme.maxWidth};
 * `;
 *
 * export const ButtonContainer = styled.div`
 *   display: flex;
 *   justify-content: center;
 *   margin: 24px 0 48px;
 *
 *   button {
 *     min-width: 140px;
 *   }
 * `;
 *
 * export const BookList = styled.div`
 *   display: grid;
 *   grid-template-columns: 1fr;
 *   grid-gap: 24px;
 *   padding: 12px 24px 24px 24px;
 *   grid-gap: 8px;
 *   padding: 12px 8px 8px 8px;
 *
 *   @media screen and (min-width: 767px) {
 *     grid-template-columns: 1fr 1fr;
 *     grid-gap: 24px;
 *     padding: 12px 24px 24px 24px;
 *   }
 *
 *   @media screen and (min-width: 1200px) {
 *     grid-template-columns: 1fr 1fr 1fr;
 *   }
 * `;
 *
 * export const NoBooksContainer = styled.div`
 *   font-size: 1.3em;
 *   color: ${({ theme }) => theme.lightTextColor};
 *   padding: 24px 0;
 * `; */
