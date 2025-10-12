// Middleware: 404 handler
function notFound(req, res, next) {
  res.status(404).json({ error: "Not found" });
}
// Middleware: Error handler
function errorHandler(err, req, res, next) {
  console.error("Error:", err.message);
  res.status(500).json({ error: "Internal server error" });
}

module.exports = { notFound, errorHandler };
