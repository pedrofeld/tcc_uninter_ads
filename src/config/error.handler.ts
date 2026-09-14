import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";

export function handleError(error: unknown) {
    if (error instanceof PrismaClientKnownRequestError) {
        console.error(`Erro [${error.code}]: ${error.message}`);
        return null;
    }

    console.log(error);
    return null;
}