const internalServerError = (req, res) => {
   res.writeHead(500);
   res.end('internal server error');
};

module.exports = internalServerError;
