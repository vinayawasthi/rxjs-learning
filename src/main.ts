import axios from "axios";
import { ajax } from "rxjs/ajax";
import {
  BehaviorSubject,
  from,
  interval,
  merge,
  of,
  pipe,
  Subscription,
  timer,
} from "rxjs";
import {
    concatMap,
  exhaustMap,
  filter,
  map,
  max,
  mergeMap,
  min,
  pluck,
  reduce,
  switchMap,
  take,
  takeUntil,
  tap,
  toArray,
} from "rxjs/operators";
import { Post } from "./model";

console.clear();

const currentDate = new Date();
let xl1$ = of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
const lst = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

xl1$ = from(lst);
let x1 = xl1$.pipe(
  filter((x) => x >= 1 && x <= 10),
  reduce((acc, value, index) => (acc = acc + value))
);
x1.subscribe((x) => console.log(`total value after filter ${x}`));

const startOfNextMinute = new Date(
  currentDate.getFullYear(),
  currentDate.getMonth(),
  currentDate.getDate(),
  currentDate.getHours(),
  currentDate.getMinutes() + 1
);

/*
let x = interval(1000).pipe(
     takeUntil(timer(startOfNextMinute))
 )
x.subscribe((x)=> console.log(`intelval value received ${x}`))
*/

// mergeMap allow mutiple inner subscriptions while switchMap allow only one
// switchMap cancels previous HTTP requests that are still in progress, while mergeMap lets all of them finish.
// use mergeMap if you simply want to flatten the data into one Observable,
// use switchMap if you need to flatten the data into one Observable but only need the latest value
// use concatMap if you need to flatten the data into one Observable and the order is important to you.
// A good use case for switchMap would be an autocomplete input, where we should discard all but the latest results from the user’s input.

/*
const API_URL = "https://jsonplaceholder.typicode.com/posts";
from(axios.get<Post[]>(API_URL))
  //ajax.getJSON<Post[]>(API_URL)
  .pipe(
    mergeMap((x) => (x.status === 200 ? x.data : [])),
    map((x) => x.id),
    filter((x) => x >= 1 && x <= 10),
    toArray()
  );
.subscribe(console.log);
*/

interface vas {
    outerIndex: number,
    outerValue: number,
    innerIndex: number,
    innerValue: number
}

const isEven = (val:vas) => val.outerValue < 5;

let x132 = timer(0, 5000)
  .pipe(
    tap((val) => console.log(`BEFORE MAP: ${val}`)),
    take(5),
    switchMap(
      (_) => interval(1000).pipe(take(8)),
      (outerValue, innerValue, outerIndex, innerIndex) => ({
        outerIndex,
        outerValue,
        innerIndex,
        innerValue,
      } as vas),      
    ),
    takeUntil(timer(startOfNextMinute))
  );
//x132.subscribe((x) => console.log(`intelval value received`, x));




const firstInterval = interval(5000).pipe(take(10));
const secondInterval = interval(1000).pipe(take(50));

/*
When we subscribed to the first interval, it starts to emit a values (starting 0).
This value is mapped to the second interval which then begins to emit (starting 0).  
While the second interval is active, values from the first interval are ignored.
We can see this when firstInterval emits number 3,6, and so on...

    Output:
    Emission of first interval: 0
    0
    1
    Emission of first interval: 3
    0
    1
    Emission of first interval: 6
    0
    1
    Emission of first interval: 9
    0
    1
*/


const exhaustSub = firstInterval
  .pipe(
    tap((val) => console.log(`before exhaustMap: ${val}`)),
    exhaustMap((f) => {
      console.log(`Emission Corrected of interval: ${f}`);
      return secondInterval;
    })    
  )
  .subscribe((s) => console.log(s));

// setTimeout(() => {
//     exhaustSub.unsubscribe();
// }, 10000);
