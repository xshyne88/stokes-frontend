import React from "react";
import { Button } from "@material-ui/core";

const MISSING_ERROR = "Error swallowed during propagation.";

export class ErrorBoundary extends React.Component {
  state = {
    error: null,
    hasError: false
  };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error: error || new Error(MISSING_ERROR) });
    console.log("caught error");
  }

  handleReset = () => {
    this.setState({ error: null, hasError: false });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback({ onReset: this.handleReset });
      }
      return <PageError onReset={this.handleReset} />;
    }

    return this.props.children;
  }
}

const PageError = ({ onReset }) => (
  <Button primary onClick={onReset}>
    Retry
  </Button>
);
