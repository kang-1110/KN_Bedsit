
export type ResponseType<T> = {
    code: number;
    results: {
        object: T;
    }
}

export type ResponseListType<T> = {
    code: number;
    results: {
        object: {
            rows: T[];
        }
    }
}