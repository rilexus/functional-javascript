function reduce(callback, array, init) {
  let currIdx;
  let acc;

  if(!init) {
    currIdx = 1;
    acc = array[0];
  } else {
    currIdx = 0;
    acc = init;
  }

  for(let i = currIdx; i < array.length; ++i){
    acc = callback(acc, array[i]);
  }

  return acc
}

// console.log(reduce((acc, curr) => acc + curr,[1,1,1,1]))

function getValue(byKey){
  return (obj) => {
    return obj[byKey]
  }
}
const a = {
  key: 'some'
}

// const getKey = pipe(getValue('key'))
// console.log(getKey(a))


function pipe(...fns){
  return function piped(arg){
    fns.forEach((f) => {
      arg = f(arg)
    });

    return arg;
  }
}

function compose(...fns) {
  return pipe(...fns.reverse())
}


function memoize(fn){
  let val;
  return function(...args){
    if(!val){
      val = fn(...args)
    }
    
    return val
  }
}
// const addOneTo = memoize((a) => a+1);
// console.log(addOneTo(1))


function hasVoule(str){
  return [...str].some(isVould)
}
function isLower(str){
  return [...str].every((char) => char === char.toLowerCase())
}
function when(arg){
  return function(...predicates){
    const is = predicates.every(p => p(arg))
    return function(callback){
      if(is) callback(arg)
    }
  }
}

// when('some')(hasVoule, isLower)((arg) => {
//   console.log(arg)
// })


// function isPalindrom(str){
//   // compare first and last char
//   if(str[0] !== str[str.length-1]) return false;
  
//   // cut off first and last char
//   const sub = str.slice(1,str.length-1)
  
//   // one char and '' are polindroms
//   if(sub <= 1) return true;

//   return isPalindrom(sub);
// }

// revents stack and/or heap overflows
// works only with proper "tail called" recursive functions
function trampline(fn){
  return function tramplined(...args){
    let res = fn(...args);
    // while in recursion
    while(typeof res === 'function'){
      res = res()
    }
    return res
  }
}

function isVould(char){
  return ['a','e','i','o','u'].includes(char);
}

// basic recursive implementation
// function countVouls(str, c = 0){
//   c = c + (isVould(str[0]) ? 1 : 0)
//   if(str.length === 0) return c;
//   return count(str.slice(1), c)
// }


const count = trampline(function countVouls(str, c = 0){
  c = c + (isVould(str[0]) ? 1 : 0)
  if(str.length === 0) return c;
  
  return function(){
    return count(str.slice(1), c)
  }
})

const isPalindrom = trampline(function isPalindrom(str){
  // compare first and last char
  if(str[0] !== str[str.length-1]) return false;
  
  // cut off first and last char
  const sub = str.slice(1,str.length-1)
  
  // one char and '' are polindroms
  if(sub <= 1) return true;

  return function(){
    return isPalindrom(sub);
  };
})

// console.log(isPalindrom('aabbaa'))


function map(fn){
  return function(array){
    return array.map(fn)
  }
}

function addOne(a){return a+1};
function subOne(a){return a-1};

function transduce (transducer, reducer,init,array) {
  const a = transducer(array);
  return a.reduce(reducer,init);
}

function into(transducer, init, array){
  const a = transducer(array);
  const sum = (acc, v) => acc + v;
  const concat = (acc,v) => `${acc} ${v}`;
  const merge = (acc, v) => [...acc, v];

  const type = typeof init;
  if(type === 'number'){
    return a.reduce(sum,init)
  };
  if (type === 'string'){
    return a.reduce(concat, init)
  }

  return a.reduce(merge,init)
}


// const transducer = compose(map(addOne), map(subOne));

// console.log(into(transducer, '',[1,1,1]))


function curry(timesToCurry,fn){
  const argsCache = [];
  
  function curried (arg){
    argsCache.push(arg);
    --timesToCurry;
    if(timesToCurry === 0){
      return fn(...argsCache)
    }
    return curried
  }

  return curried
}

