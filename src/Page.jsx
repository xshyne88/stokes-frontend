import React from "react";
import { ErrorBoundary } from "./ErrorBoundary";
import BottomNavigation from "./headerfooter/BottomNavigation";
import Header from "./headerfooter/Header";
import { Container } from "@material-ui/core";

export default ({ children }) => (
  <ErrorBoundary>
    <Header />
    <ErrorBoundary>
      <Container>{children}</Container>
    </ErrorBoundary>
    <BottomNavigation />
  </ErrorBoundary>
);
