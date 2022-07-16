import { BehaviorSubject, from, of, Subscription, timer } from "rxjs";
import { exhaustMap, filter, map, max, mergeMap, min, reduce, switchMap, tap } from "rxjs/operators";
import axios from "axios";

console.clear();
console.log("Hello!!");

const lst = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

let xl1$ = of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

xl1$ = from(lst);

let x1 =xl1$.pipe(filter(x => (x >= 1 && x <= 10)), reduce((acc, value, index) => acc = acc + value))

x1.subscribe((x) => console.log(x))

