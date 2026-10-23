// src/components/ErrorBoundary.js
// Stage 6 / Q12c: High-Reliability Error Boundary for ReWear
// Catches uncaught runtime errors in child components, prevents blank screen,
// and presents clear readable diagnostic details with a "Back to Home" recovery button.
// Written with standard React.createElement for isomorphic Node & Vite execution.

import React, { Component } from 'react';
import { AlertOctagon, RotateCcw, Home } from 'lucide-react';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught error:', error, errorInfo);
    this.setState({ errorInfo });
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleBackHome = () => {
    this.state = { hasError: false, error: null, errorInfo: null };
    try {
      this.setState({ hasError: false, error: null, errorInfo: null });
    } catch {
      // Ignore if called on unmounted test mock
    }
    if (this.props.onReset) {
      this.props.onReset();
    } else if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return typeof this.props.fallback === 'function'
          ? this.props.fallback(this.state.error, this.handleBackHome)
          : this.props.fallback;
      }

      const errorMessage =
        this.state.error?.message || String(this.state.error || 'Unknown application error');
      const errorStack =
        this.state.error?.stack || this.state.errorInfo?.componentStack || '';

      return React.createElement(
        'div',
        { className: 'min-h-screen bg-stone-900 text-stone-100 flex items-center justify-center p-4' },
        React.createElement(
          'div',
          { className: 'w-full max-w-md bg-stone-800 border-2 border-red-500/60 rounded-3xl p-6 shadow-2xl space-y-4' },
          React.createElement(
            'div',
            { className: 'flex items-center gap-3 text-red-400' },
            React.createElement(
              'div',
              { className: 'w-10 h-10 rounded-2xl bg-red-950/80 border border-red-500/40 flex items-center justify-center shrink-0' },
              React.createElement(AlertOctagon, { className: 'w-6 h-6 text-red-400' })
            ),
            React.createElement(
              'div',
              null,
              React.createElement('h2', { className: 'text-base font-black text-white' }, 'Application Crash Detected'),
              React.createElement('p', { className: 'text-xs text-stone-400' }, 'An unexpected error occurred in ReWear')
            )
          ),
          React.createElement(
            'div',
            { className: 'bg-stone-950 p-3.5 rounded-2xl border border-stone-700/80 space-y-2' },
            React.createElement('div', { className: 'text-[11px] font-bold text-red-300 uppercase tracking-wider' }, 'Error Details:'),
            React.createElement('div', { className: 'text-xs font-mono text-red-200 break-words leading-relaxed' }, errorMessage),
            errorStack
              ? React.createElement(
                  'details',
                  { className: 'pt-1' },
                  React.createElement('summary', { className: 'text-[10px] text-stone-400 cursor-pointer hover:text-stone-300 select-none' }, 'View Call Stack'),
                  React.createElement('pre', { className: 'mt-2 text-[10px] text-stone-400 font-mono overflow-x-auto max-h-40 p-2 bg-stone-900 rounded-xl whitespace-pre-wrap' }, errorStack)
                )
              : null
          ),
          React.createElement(
            'div',
            { className: 'pt-2 flex gap-3' },
            React.createElement(
              'button',
              {
                type: 'button',
                onClick: this.handleBackHome,
                className: 'flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold rounded-2xl flex items-center justify-center gap-2 shadow-md transition active:scale-95 cursor-pointer',
              },
              React.createElement(Home, { className: 'w-4 h-4' }),
              React.createElement('span', null, 'Back to Home')
            ),
            React.createElement(
              'button',
              {
                type: 'button',
                onClick: () => {
                  if (typeof window !== 'undefined') window.location.reload();
                },
                className: 'py-3 px-4 bg-stone-700 hover:bg-stone-600 text-stone-200 text-xs font-bold rounded-2xl flex items-center justify-center gap-1.5 transition active:scale-95 cursor-pointer',
                title: 'Reload App',
              },
              React.createElement(RotateCcw, { className: 'w-3.5 h-3.5' }),
              React.createElement('span', null, 'Reload')
            )
          )
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
