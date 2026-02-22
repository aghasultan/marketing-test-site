import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorBoundaryProps {
    children: ReactNode;
    fallback?: ReactNode;
    componentName?: string;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    public state: ErrorBoundaryState = {
        hasError: false,
        error: null
    };

    public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        // Update state so the next render will show the fallback UI.
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error(`ErrorBoundary caught an error in ${this.props.componentName || 'a component'}:`, error, errorInfo);
        // You could also log the error to an error reporting service here
    }

    public render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="flex flex-col items-center justify-center p-8 rounded-xl border border-red-500/20 bg-red-500/5 text-center h-full min-h-[200px]">
                    <AlertCircle className="w-10 h-10 text-red-500/80 mb-4" />
                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                        Unable to load content
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-sm">
                        There was a problem rendering this section {" "}
                        {this.props.componentName ? `(${this.props.componentName})` : ''}.
                        Please try refreshing the page.
                    </p>
                </div>
            );
        }

        return this.props.children;
    }
}
