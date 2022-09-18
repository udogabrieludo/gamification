import React from 'react'

const ErrorPage = () => {
    return (
        <div style={{display: "flex", flexDirection: "column", textAlign: "center", width: '100%', height: '100vh', justifyContent: 'center', alignItems: 'center'}}>
            <div>
            <div><h1>404</h1></div>
            <div>
            <h3>The page you are looking for does not exist.!!</h3>
            </div>
            </div>
            <div>
          <p>
            You need to login <a href="/">login here</a>
          </p>
        </div>
        </div>
    )
}

export default ErrorPage
