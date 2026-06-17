const notFound = (req, res, next) => {
    res.status(404).json({ message: `Route not found: ${req.originalUrl}` });
};

const errorHandler = (err, req, res, next) => {
    const status = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(status).json({ message: err.message || "Server error" });
};

module.exports = { notFound, errorHandler };
