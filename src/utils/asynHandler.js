//const asyncHandler = () =>{}
//const asyncHandler = (func) =>{}
//const asyncHandler =(func) =>{() =>{}}
//const asyncHandler = (func) =>() =>{}

//next tells us to move to the next middleware in the stack
// const asyncHandler = (fun) => {
//   async (req, res, next) => {
//     try {
//         await fun(req, res, next);
//     } catch (err) {
//       req
//         .status(err.code || 500)
//         .json({ success: false, message: err.message });
//     }
//   };
// };

const asyncHandler = (requestHandler) => 
  (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };

export default asyncHandler;
