/*
   Each new term in the Fibonacci sequence is generated by adding the previous
   two terms. By starting with 1 and 2, the first 10 terms will be:
   1, 2, 3, 5, 8, 13, 21, 34, 55, 89, ...
   By considering the terms in the Fibonacci sequence whose values do not exceed
   four million, find the sum of the even-valued terms.
*/
static MAX: u32 = 4_000_000;

type I = i64;
// thanks, https://doc.rust-lang.org/rust-by-example/trait/iter.html
struct Fibonacci {
   curr: I,
   next: I,
}

impl Iterator for Fibonacci {
   type Item = I; // the Iterator trait needs this
   fn next(&mut self) -> Option<I> {
      let new_next = self.curr + self.next;
      self.curr = self.next;
      self.next = new_next;
      return Some(self.curr);
   }
}


fn main() {
   let fib = Fibonacci { curr: 0, next: 1 };
   let sum: I = fib.take_while(|x| *x <= MAX.into()).filter(|x| *x % 2 == 0).sum();
   println!("{}", sum);
}
