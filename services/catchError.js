const catchError = (func) => {
  return (req, res, next) => {
    func(req, res, next).catch((err) => {
      console.log(err, "asynchronous error handling in project");
      res.status(500).send(err.messsage);
    });
  };
};

module.exports = catchError;
