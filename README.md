This is a series of `.ts` scripts I used to learn TypeScript and AssemblyScript. Each folder explores a topic from each of the other languages I'm used to and relates to TypeScript (*Haskell*, *JavaScript*, *Rust* and *Python*).

  + In `/structures` you can find typed data structures - or in a more detailed sense, monads, a functional-programming concept (essentially Objects that implement common operations to work).
  Namely, there are implementations of `Queue` and `LinkedList` data structures and `Maybe` and `Either` monads.

  + In `/assembly` there are scripts used to compile TypeScript down to WebAssembly by using AssemblyScript. These scripts are intended to work at near-native performance while being able to be executed in web environments.