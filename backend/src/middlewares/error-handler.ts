import { AppError, HttpCode } from '../exceptions/exceptions';
import { NextFunction, Request, Response } from 'express';

class ErrorHandler {
  private isTrustedError(error: Error): boolean {
    if (error instanceof AppError) {
      return error.isOperational;
    }

    return false;
  }

  public handleError(
    error: Error | AppError,
    request: Request,
    response: Response,
    next: NextFunction
  ): void {
    console.log('HANDLER');
    if (this.isTrustedError(error) && response) {
      this.handleTrustedError(error as AppError, response);
    } else {
      this.handleCriticalError(error, response);
    }
  }

  private handleTrustedError(error: AppError, response: Response): void {
    response.status(error.httpCode).json({ message: error.message });
  }

  private handleCriticalError(
    error: Error | AppError,
    response?: Response
  ): void {
    if (response) {
      response
        .status(HttpCode.INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal server error' });
    }

    console.log('Application encountered a critical error. Exiting');
    process.exit(1);
  }
}

export const errorHandler = new ErrorHandler();
