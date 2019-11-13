import React from "react";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { Container } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

export default ({ history }) => (
  <>
    <Container
      style={{
        display: "flex",
        justifyContent: "space-between",
        paddingLeft: 0
      }}
    >
      <KeyboardBackspaceIcon onClick={e => history.goBack()} />
      <Typography style={{ marginLeft: 20 }}>Go Back</Typography>
    </Container>
  </>
);
