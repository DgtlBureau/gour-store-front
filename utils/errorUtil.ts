import { ErrorData, ErrorWithDataMessage, ErrorWithMessage } from 'types/entities/ErrorWithMessage';

function checkErrorMessage(error: unknown): error is ErrorWithMessage {
  const isObject = typeof error === 'object';
  const isNull = error === null;

  const withMessage = isObject && !isNull && 'message' in error;
  const withStringMessage = withMessage && typeof (error as ErrorData).message === 'string';

  return withStringMessage;
}

function checkErrorDataMessage(error: unknown): error is ErrorWithDataMessage {
  const isObject = typeof error === 'object';
  const isNull = error === null;

  const withData = isObject && !isNull && 'data' in error;
  const withDataMessage = withData && 'message' in (error as { data: ErrorData }).data;
  const withStringDataMessage = withDataMessage && typeof (error as { data: ErrorData }).data.message === 'string';

  return withStringDataMessage;
}

function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
  const isErrorWithMessage = checkErrorMessage(maybeError);

  if (isErrorWithMessage) return maybeError;

  const isErrorWithDataMessage = checkErrorDataMessage(maybeError);

  if (isErrorWithDataMessage) return maybeError.data;

  try {
    return new Error(JSON.stringify(maybeError));
  } catch {
    return new Error(String(maybeError));
  }
}

export function getErrorMessage(error: unknown) {
  return toErrorWithMessage(error).message;
}
