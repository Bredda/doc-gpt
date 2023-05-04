import logger from '../common/logger';
import { AppError, HttpCode } from '../exceptions/exceptions';
import { NextFunction, Request, Response } from 'express';

const handleTrustedError = (error: AppError, response: Response): void => {
  logger.error('Trusted error', error);
  response.status(error.httpCode).json({ message: error.message });
};

const isTrustedError = (error: Error): boolean => {
  if (error instanceof AppError) {
    logger.debug('Error is AppError instance');
    logger.debug('Error is operational', error.isOperational);
    return error.isOperational;
  }
  logger.debug('Error is NOT AppError instance');
  return false;
};

const handleCriticalError = (
  error: Error | AppError,
  response?: Response
): void => {
  logger.error('Critical error', error);
  if (response) {
    response
      .status(HttpCode.INTERNAL_SERVER_ERROR)
      .json({ message: 'Internal server error' });
  }

  logger.error('Application encountered a critical error. Exiting');
  process.exit(1);
};

export const errorHandler = (
  error: Error | AppError,
  request: Request,
  response: Response,
  next: NextFunction
): void => {
  if (isTrustedError(error) && response) {
    handleTrustedError(error as AppError, response);
  } else {
    handleCriticalError(error, response);
  }
};
