import React, { Component, ReactNode } from 'react';

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

interface ErrorBoundaryProps {
    children: ReactNode;
    fallback?: ReactNode;
}

class CanvasErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('Canvas Error:', error, errorInfo);
    }

    handleRetry = () => {
        this.setState({ hasError: false, error: null });
    };

    render() {
        if (this.state.hasError) {
            return this.props.fallback || (
                <div className="w-full h-full flex items-center justify-center bg-background">
                    <div className="glass-rose p-8 rounded-2xl max-w-md text-center">
                        <h2 className="text-xl font-bold text-white mb-3">WebGL Error</h2>
                        <p className="text-rose-peach/70 text-sm mb-6">
                            The 3D engine encountered an issue. This can happen due to hardware acceleration limitations.
                        </p>
                        <button
                            onClick={this.handleRetry}
                            className="px-6 py-3 bg-rose-red text-white rounded-lg hover:bg-rose-red/80 transition-colors"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default CanvasErrorBoundary;
