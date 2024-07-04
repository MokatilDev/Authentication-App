const errorResponse = (statusCode: number, errorType: string, message: string) => {
    return { statusCode, errorType, message }
}

export default errorResponse