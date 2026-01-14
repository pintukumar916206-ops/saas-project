export const catchAsyncErrors = (theFunction) => {
  return (err, req, res, next) => {
    Promise.resolve(theFunction(req, res, next)).catch(next);
  };
};
