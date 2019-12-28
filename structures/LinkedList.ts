
export class Node<A> {
    private val: A;
    public prev: Node<A>;
    public next: Node<A>;

    constructor(value: A, prev: Node<A>, next: Node<A>) {
        this.val = value;
        this.prev = prev;
        this.next = next;
    }

    value(): A { return this.val; }
    setPrev(n: Node<A>) { this.prev = n; }
    setNext(n: Node<A>) { this.next = n; }
}

export class LinkedList<A> {
    private start: Node<A>;

    constructor(value: A) {
        this.start = new Node(value, null, null);
    }

    private _tail(): Node<A> {
        let curr_node = this.start;
        while(curr_node.next != null) {
            curr_node = curr_node.next;
        }
        return curr_node; // here I dont want 'this' (.start) to be modified
    }

    map(f: (a:any) => any): LinkedList<any> {
        let curr_node = this.start;
        while(curr_node != null) {
            curr_node.value = f(curr_node.value);
            curr_node = curr_node.next;
        }
        return this; // here I want 'this' to be modified
    }

    toList(): A[] {
        let curr_node = this.start;
        let ls = [];
        while(curr_node != null) {
            ls.push(curr_node.value);
            curr_node = curr_node.next;
        }
        return ls;
    }

    prepend(a: A) {
        let oldStart = this.start;
        let newNode = new Node(a, null, this.start);
        oldStart.setPrev(newNode);
    }

    append(a: A) {
        let tail = this._tail();
        let newNode = new Node(a, tail, null);
        tail.setNext(newNode);
    }

    delete(a: any) {
        let curr_node = this.start;
        while(curr_node.value != a) {
            curr_node = curr_node.next;
        }
        if(curr_node != null) {
            let prev = curr_node.prev;
            let next = curr_node.next;
            prev.setNext(next);
            next.setPrev(prev);
        }
    }

    toListRev(): A[] {
        return this.toList().reverse();
    }
}