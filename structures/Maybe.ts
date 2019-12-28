
export class Maybe<T> {
    private value: T; // data is (implicitly) not modifiable once set
    
    /**
     * Allows to define either a Just or Nothing type
     * @param value (optional)
     */
    protected constructor(value?: T) {
        this.value = value || undefined;
    }

    isJust(): boolean { return this.value != undefined; }
    isNothing(): boolean { return this.value == undefined; }

    fromJust(): T {
        if(this.value == undefined) {
            throw new TypeError("Exception: Maybe.fromJust: Nothing");
        }
        return this.value;
    }

    fromMaybe(_default: T): T {
        return (this.value == undefined) ? _default : this.value;
    }

    /**
     * 
     * @param b A default argument of type B
     * @param f A function that takes a value of type A and returns a B
     * @param a A Maybe of type A
     */
    static maybe<A,B>(b: B, f: (a1:A)=>B, a: Maybe<A>): B {
        return a.isNothing() ? b : f(a.fromJust());
    }

    /**
     * 
     * @param ls A list of values
     */
    static listToMaybe(ls: any[]): Maybe<any> {
        return (ls.length == 0) ? new Nothing() : new Just(ls.pop());
    }

    /**
     * 
     * @param a A Maybe object
     */
    static maybeToList(a: Maybe<any>): any[] {
        return a.isJust() ? [a.fromJust()] : [];
    }

    /**
     * 
     * @param ls A list of Maybe objects
     */
    static catMaybes(ls: Maybe<any>[]): any[] {
        return ls.filter(a => a.isJust()).map(a => a.fromJust());
    }

    /**
     * 
     * @param f A function that takes a value and returns a Maybe object
     * @param ls A list of values
     */
    static mapMaybe(f: (a:any) => Maybe<any>, ls: any[]): Maybe<any>[] {
        return ls.map(f);
    }
}

export class Just extends Maybe<any> {
    // Wraps a single value inside a Just object
    constructor(value: any) {
        super(value);
    }
}

export class Nothing extends Maybe<any> {
    // Wraps a null object inside a Nothing object
    constructor() {
        super();
    }
}