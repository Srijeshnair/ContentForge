export type ErrorType = 'validation' | 'network' | 'server' | 'timeout' | 'unknown';

export interface ParsedError {
  type: ErrorType;
  message: string;
  userMessage: string;
  isDismissible: boolean;
}

export function parseError(error: unknown): ParsedError {
  // Handle network errors
  if (error instanceof TypeError) {
    if (error.message.includes('fetch') || error.message.includes('Failed to fetch')) {
      return {
        type: 'network',
        message: error.message,
        userMessage: 'Connection failed. Please check your internet connection and try again.',
        isDismissible: true,
      };
    }
  }

  // Handle custom validation errors
  if (error instanceof Error && error.message.includes('Validation')) {
    return {
      type: 'validation',
      message: error.message,
      userMessage: error.message,
      isDismissible: true,
    };
  }

  // Handle abort errors (timeouts)
  if (error instanceof Error && error.name === 'AbortError') {
    return {
      type: 'timeout',
      message: 'Request timeout',
      userMessage: 'The request took too long. Please try again.',
      isDismissible: true,
    };
  }

  // Handle API errors
  if (error instanceof Error) {
    const message = error.message;
    
    // Check for server errors
    if (message.includes('500') || message.includes('502') || message.includes('503')) {
      return {
        type: 'server',
        message,
        userMessage: 'Server error. Please try again later.',
        isDismissible: true,
      };
    }

    // Check for rate limiting
    if (message.includes('429')) {
      return {
        type: 'server',
        message,
        userMessage: 'Too many requests. Please wait a moment and try again.',
        isDismissible: true,
      };
    }

    // Check for 404
    if (message.includes('404')) {
      return {
        type: 'server',
        message,
        userMessage: 'Service not found. Please refresh and try again.',
        isDismissible: true,
      };
    }

    // Generic error message from server
    return {
      type: 'server',
      message,
      userMessage: message.length > 10 ? message : 'Unable to process your request. Please try again.',
      isDismissible: true,
    };
  }

  // Fallback for unknown errors
  return {
    type: 'unknown',
    message: String(error),
    userMessage: 'An unexpected error occurred. Please try again.',
    isDismissible: true,
  };
}

export function getErrorSeverity(type: ErrorType): 'error' | 'warning' | 'info' {
  switch (type) {
    case 'validation':
      return 'warning';
    case 'network':
    case 'timeout':
      return 'error';
    case 'server':
      return 'error';
    default:
      return 'error';
  }
}
