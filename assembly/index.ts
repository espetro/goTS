// The entry file of your WebAssembly module.

export class PCG32_Random {
  state: u64;
  inc: u64;

  constructor(state: u64 = 0, inc: u64 = 0) {
    this.state = state;
    this.inc = inc;
  }

}
export class ComputeFuncs {
  private static ct18: u32 = 18;
  private static ct27: u32 = 27;
  private static ct59: u32 = 59;
  private static longVal: i64 = 6364136223846793005;
  
  static fib(x: usize): usize {
    switch(x) {
      case 0:
        return 0;
      case 1:
        return 1;
      default:
        return this.fib(x-1) + this.fib(x-2);
    }
  }

  /**
   * (Really-Minimal) PCG Random Number Generation for AssemblyScript
   * Copyright 2019 Quim Terrasa <quino.terrasa+dev@gmail.com>
   * Licensed under the Apache License, Version 2.0
   * (NO WARRANTY, etc. see website).
   * @param rng 
   */
  static pcg32_random_r(rng: PCG32_Random): u32 {
    let oldstate: u64 = rng.state;
    rng.state = oldstate * this.longVal + (rng.inc | 1);
    let xorshifted: u32 = (((oldstate as u32) >> this.ct18) ^ (oldstate as u32)) >> this.ct27;
    let rot: u32 = (oldstate as u32) >> this.ct59;
    return (xorshifted >> rot) | (xorshifted << ((-rot) & 31));
  }
}
