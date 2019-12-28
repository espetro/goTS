
export class Either<A,B> {
    /** The Either type is sometimes used to represent a value which is either
     *  correct or an error; by convention, the Left constructor is used to hold
     *  an error value and the Right constructor is used to hold a correct value
     *  (mnemonic: "right" also means "correct").
     */
    private value: any;
    private side: Either.Side;

    // 'protected' keyword allows to get Either objects just by using Left or Right
    protected constructor(left?: A, right?: B) {
        if(left != undefined) {
            this.value = left;
            this.side = Either.Side.Left;
        } else if(right != undefined) {
            this.value = right;
            this.side = Either.Side.Right;
        } else {
            throw new SyntaxError("Exception: Wrong object instance: Either");
        }
    }

    isLeft(): boolean { return this.side == Either.Side.Left; }

    isRight(): boolean { return this.side == Either.Side.Right; }

    fromLeft(a: A): A {
        return this.isLeft() ? this.value : a;
    }

    fromRight(b: B): B {
        return this.isRight() ? this.value : b;
    }

    static lefts<M,N>(ls: Either<M,N>[]): M[] {
        return ls.filter(e => e.isLeft()).map(e => e.value);
    }

    static rights<M,N>(ls: Either<M,N>[]): N[] {
        return ls.filter(e => e.isRight()).map(e => e.value);
    }

    static partitionEithers<M,N>(ls: Either<M,N>[]): [M[], N[]] {
        return [this.lefts(ls), this.rights(ls)];
    }
}

export namespace Either {
    export enum Side {Left, Right};
}

export class Left extends Either<any,any> {
    constructor(value: any) {
        super(value, null);
    }
}

export class Right extends Either<any,any> {
    constructor(value: any) {
        super(null, value);
    }
}