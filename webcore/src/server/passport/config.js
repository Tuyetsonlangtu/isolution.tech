/**
 * Created by hien.tran on 6/2/2017.
 */


module.exports = {
  // Authentication
  auth: {
    facebook: {
      clientID: process.env.FACEBOOK_APP_ID || '2006619856232997',
      clientSecret: process.env.FACEBOOK_APP_SECRET || '2466ea45b5f5d3d1b2227758c08f0922',
      callbackURL: '/auth/facebook/callback'
    },

    google: {
      id: process.env.GOOGLE_CLIENT_ID || '251410730550-ahcg0ou5mgfhl8hlui1urru7jn5s12km.apps.googleusercontent.com',
      secret: process.env.GOOGLE_CLIENT_SECRET || 'Y8yR9yZAhm9jQ8FKAL8QIEcd',
    },

    twitter: {
      key: process.env.TWITTER_CONSUMER_KEY || 'Ie20AZvLJI2lQD5Dsgxgjauns',
      secret: process.env.TWITTER_CONSUMER_SECRET || 'KTZ6cxoKnEakQCeSpZlaUCJWGAlTEBJj0y2EMkUBujA7zWSvaQ',
    },
  },
};
