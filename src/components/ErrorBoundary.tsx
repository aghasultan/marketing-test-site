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
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-zinc-950 text-foreground p-4">
          <div className="text-center max-w-md p-8 border border-zinc-200 dark:border-white/10 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 backdrop-blur-xl">
            <h1 className="text-2xl font-bold mb-4 text-emerald-500 font-mono tracking-tight">System Malfunction</h1>
            <p className="text-muted-foreground mb-6">
              The application encountered an unexpected state. Our engineers have been notified.
            </p>
            <button
              autoFocus
              className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors font-medium shadow-lg shadow-emerald-900/20"
              onClick={() => window.location.reload()}
            >
              Reinitialize System
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
