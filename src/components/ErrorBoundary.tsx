import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State { // eslint-disable-line @typescript-eslint/no-unused-vars
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white p-4">
          <div className="text-center max-w-md">
            <h1 className="text-2xl font-bold mb-4 text-emerald-500">Something went wrong</h1>
            <p className="text-slate-400 mb-6">
              We encountered an unexpected error. Please verify your connection and try refreshing the page.
            </p>
            <button
              autoFocus
              className="px-6 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700"
              onClick={() => window.location.reload()}
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
