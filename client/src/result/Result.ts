export type Result<T, E> = Success<T> | Failure<E>;

export class Success<T> {
    readonly isSuccess: true = true;
    readonly isFailure: false = false;

    constructor(public readonly value: T) {}

    map<U>(fn: (value: T) => U): Result<U, never> {
        return new Success(fn(this.value));
    }

    flatMap<U, E>(fn: (value: T) => Result<U, E>): Result<U, E> {
        return fn(this.value);
    }
}

export class Failure<E> {
    readonly isSuccess: false = false;
    readonly isFailure: true = true;

    constructor(public readonly error: E) {}
}

export function success<T>(value: T): Success<T> {
    return new Success(value);
}

export function failure<E>(error: E): Failure<E> {
    return new Failure(error);
}