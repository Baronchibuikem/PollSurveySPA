import React, { Component } from 'react'

export default class ErrorBoundary extends Component {
    state = {
        hasError: false
    }

    static getDerivedStateFromError(error) {
        return {
            hasError: true
        }
    }

    render() {
        if (this.state.hasError) {
            return <h4 className="text-center mt-5">Something went wrong</h4>
        }
        return this.props.children
    }
}
