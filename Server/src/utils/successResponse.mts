const successResponse = (statusCode: number, message: string, data?: any) => {
    return { statusCode, message, data }
}

export default successResponse