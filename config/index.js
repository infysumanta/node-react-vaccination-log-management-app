module.exports = {
  PORT: process.env.PORT || 5000,
  MONGO_URI:
    process.env.MONGO_URI ||
    "mongodb://localhost/node-react-vaccination-log-management-app",
  JWT_TOKEN: process.env.JWT_TOKEN || "thisisjwttoken",
};
