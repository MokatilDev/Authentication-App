import { Request, Response, NextFunction } from "express";


const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();

    console.log(`Received ${req.method} request for ${req.url}`);

    res.on("finish", () => {
        const duration = Date.now() - start;
        console.log(`Completed ${req.method} ${req.url} in ${duration}ms`);
    });

    next();
};

export default requestLogger