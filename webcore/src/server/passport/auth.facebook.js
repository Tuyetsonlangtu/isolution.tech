/**
 * Created by hien.tran on 6/2/2017.
 */

import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import config from './config';
import { UserLogin , User, UserProfile} from '../../models';
import { passwordEncryption } from '../../common/common';

passport.use(new FacebookStrategy({
  clientID: config.auth.facebook.clientID,
  clientSecret: config.auth.facebook.clientSecret,
  callbackURL: config.auth.facebook.callbackURL,
  profileFields: ['displayName', 'name', 'email', 'link', 'locale', 'timezone'],
  passReqToCallback: true,
}, (req, accessToken, refreshToken, profile, next) => {
  const loginName = 'facebook';
  const claimType = 'urn:facebook:access_token';
  const fooBar = async () => {
    if (req.user) {
      next(null, {id: '123', email: 'Hien Tran',});
    } else {
      let user = await User
        .findOne({
          'email': profile._json.email
        })
        .populate('profile')
        .populate({
          path: 'logins',
          match: {'name': loginName, 'key': profile.id}
        });

      if (user) {
        let userLogin = user.logins.length == 0 ? new UserLogin() : user.logins[0];
        userLogin.name = loginName;
        userLogin.key = profile.id;
        userLogin.token = accessToken;
        userLogin = await userLogin.save();

        let userProfile = user.profile ? user.profile : new UserProfile();
        userProfile.displayName = profile.displayName;
        userProfile.picture = `https://graph.facebook.com/${profile.id}/picture?type=large`;
        userProfile.gender = profile._json.gender;
        userProfile.location = profile.location;
        userProfile = await userProfile.save();

        if(user.logins.length == 0)
          user.logins.push(userLogin);

        if(!user.profile)
          user.profile = userProfile;

        user = await user.save();
        next(null, user);

      } else {
        user = new User();
        //create login with facebook
        let userLogin = new UserLogin({
          name: loginName,
          key: profile.id,
          token: accessToken
        });
        userLogin = await userLogin.save();

        //create user profile
        let userProfile = await new UserProfile({
          displayName: profile.displayName,
          picture: `https://graph.facebook.com/${profile.id}/picture?type=large`,
          gender: profile._json.gender,
          location: profile.location
        });
        userProfile = await userProfile.save();

        //main account
        user.username = "admin";
        user.password = passwordEncryption("123456", user.salt);
        user.email = profile._json.email;
        user.logins.push(userLogin);
        user.profile = userProfile;
        user = await user.save();
        next(null, user);
      }
    }
  };
  fooBar().catch(next);
}));

export default passport;