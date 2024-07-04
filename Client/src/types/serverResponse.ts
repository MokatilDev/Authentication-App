/* eslint-disable @typescript-eslint/no-explicit-any */
interface ServerResponse {
    statusCode: number,
    message: string,
    data?: any
}

interface ErrorResponse {
    statusCode: number,
    errorType: string,
    message: string,
}

export type { ServerResponse, ErrorResponse }