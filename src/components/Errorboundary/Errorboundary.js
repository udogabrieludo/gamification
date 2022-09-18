import React from "react";
import "./error.css";
import { Link } from "react-router-dom";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    //   logErrorToMyService(error, errorInfo);
    console.log(errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="error-template">
                <h1>Oops!</h1>
                <h2>Something went wrong</h2>
                <div class="error-details">
                  Sorry, an error has occured, You also click on the button
                  below to take yout their destinations respectively
                </div>
                <div class="error-actions">
                  
                  <a href="/" class="btn btn-default btn-lg">
                    <span class="glyphicon glyphicon-envelope"></span> Take me
                    to home{" "}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
