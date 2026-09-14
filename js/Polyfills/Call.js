function greet(age) {
  console.log(this.name, age);
  return age;
}

Function.prototype.myCall = function (thisArgs, ...args){
    /*
    step 2 :identify the original function using this.
    here making fn as original function setting it to this e.g.
    
    Function.prototype.myCall = function (thisArgs, ...args){
    greet.myCall({name:"Avishek"}, 25);


    myCall - method attach to function prototype, so any function can access it
             and myCall is a function accepting thisArgs, ...args [as to suppy the args indivisually]
    
    greet - a plain js function, which is accessing the function prototpe method 
    and prototype method accepts thisArgs to set this context of greet and args as its arguments 
    */
   const fn = this;

   /*
   Step 3. Receive the thisArg — the object that should become this inside the original function.
   left side of dot become this, here storing the fn as temproary method so the value of method thisArgs.tempProperty will be fn itself
   */
//    const tempProperty = Symbol('tempProperty');
   
   /*
   checking thisArgs for null and undefined and fixing it
   */
   if(thisArgs === null || thisArgs === undefined){
    thisArgs = globalThis;
   }

   //handling primitve values
   thisArgs = Object(thisArgs);
//    thisArgs['tempProperty'] = fn;

   /*
   Step 4:     Receive all remaining arguments separately. skip as already doing ...arg
   */
   

   /*
   step 5: attaching fn temproarily to thisArgs
   */
   const tempFn = Symbol('tempFn');
   thisArgs[tempFn] = fn;

   /*
   Step 6: invoking the method created in step 5 i.e. tempFn with args
   and storing the result
   */
   
   const result = thisArgs[tempFn](...args);

   /*
   Step 7 : Removing the temproary fn
   */
   delete thisArgs[tempFn];
   /*
   step 8 : returning the result captured by invoking the fn

   */
   
   return result;
}

greet.myCall(3,  "yo", false);