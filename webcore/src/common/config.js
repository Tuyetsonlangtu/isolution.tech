const port = 4000;
module.exports = {

  jwt: {
    secret: process.env.JWT_SECRET || 'findmotel.isolution.tech',
    expiresIn: 60 * 60 * 24 * 30,
    issuer: 'findmotel.isolution.tech'
  },

  cookie: {
    expires: new Date(Date.now() + 9999999),
    httpOnly: false
  },

  // Node.js app
  port: process.env.PORT || port,

  // API Gateway
  api: {
    // API URL to be used in the client-side code
    clientUrl: process.env.API_CLIENT_URL || '',
    // API URL to be used in the server-side code
    serverUrl: process.env.API_SERVER_URL || `http://localhost:${process.env.PORT || port}`,
  },

  analytics: {
    googleTrackingId: process.env.GOOGLE_TRACKING_ID, // UA-XXXXX-X
  },

  database: {
    mongoose: {
      databaseURI : "mongodb://localhost:27017/ISolution-FindMotel",
      logging: false
    }
  }
};
