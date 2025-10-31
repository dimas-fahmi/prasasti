// HTTP Status
export type HttpStatus = 200 | 400 | 401 | 403 | 404 | 500;

// Error Codes
export type ErrorCode =
  | "failed_insertion"
  | "failed_mutation"
  | "failed_deletion"
  | "not_found";

export interface StandardizedErrorType {
  code: ErrorCode;
  message: string;
  status: HttpStatus;
  context?: unknown;
}

export class StandardizedError extends Error {
  code: ErrorCode;
  status?: HttpStatus;
  context?: unknown;

  constructor(
    code: ErrorCode,
    message: string,
    status?: HttpStatus,
    context?: unknown
  ) {
    super(message);
    this.name = "StandardizedError";
    this.code = code;
    this.status = status || 500;
    this.context = context;
  }
}
