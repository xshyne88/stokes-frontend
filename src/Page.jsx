import React from "react";
import { ErrorBoundary } from "./components/ErrorBoundary";
import BottomNavigation from "./headerfooter/BottomNavigation";
import Header from "./headerfooter/Header";
// import { Container } from "@material-ui/core";

export default ({ children }) => (
  <ErrorBoundary>
    <Header />
    <ErrorBoundary>{children}</ErrorBoundary>
    <BottomNavigation />
  </ErrorBoundary>
);
