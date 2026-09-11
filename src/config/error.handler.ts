import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";

type ErrorResponse = {
    statusCode: number;
    message: string;
};

export function handleError(error: unknown): ErrorResponse {
    if (error instanceof PrismaClientKnownRequestError) {
        return {
            statusCode: 400,
            message: error.message
        };
    }

    return {
        statusCode: 500,
        message: "Internal server error"
    };
}
