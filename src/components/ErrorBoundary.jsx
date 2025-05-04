import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Error caught by boundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-yellow-100 text-yellow-800 p-4 rounded">
          Could not load this dish card.
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;