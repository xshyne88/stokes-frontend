import React from "react";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { Container } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

export default ({ history, title = "Go Back" }) => (
  <>
    <Container
      style={{
        display: "flex",
        justifyContent: "space-between",
        paddingLeft: 0
      }}
    >
      <KeyboardBackspaceIcon onClick={_e => history.goBack()} />
      <Typography style={{ marginLeft: 20 }}>{title}</Typography>
    </Container>
  </>
);
