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


// const s = compose((a)=>a+1, (b)=>b+1);
// console.log(s(0))

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



