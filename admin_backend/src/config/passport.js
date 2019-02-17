import { Strategy as VKStrategy } from 'passport-vkontakte';

import { User } from '../models';

const VK_APP_ID = process.env.API_ID;
const VK_APP_SECRET = process.env.API_SECRET;

if (!VK_APP_ID || !VK_APP_SECRET) {
	throw new Error('Set enviroment variables for VK in order to run the application.');
}

export const configPassport = (passport) => {
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id)
			.then(function(user) {
				done(null, user);
			})
			.catch(done);
	});

	passport.use(
		new VKStrategy(
			{
				clientID: VK_APP_ID,
				clientSecret: VK_APP_SECRET,
				callbackURL: 'http://localhost:8001/api/v1/oauth/vk/callback',
				scope: [ 'groups', 'wall', 'stats' ]
			},
			async (accessToken, refreshToken, params, profile, done) => {
				console.log(accessToken);
				process.nextTick(async () => {
					try {
						console.log('here');
						const user = await User.findOne({ vkId: profile.id });
						if (!user) {
							const newUser = new User({
								vkId: profile.id,
								firstName: profile.name.givenName,
								lastName: profile.name.familyName,
								screenName: profile.username,
								accessToken: accessToken
							});
							return newUser.save()
								.then((savedUser) => done(null, savedUser));
							
						}
						console.log(user);
						return done(null, user);
					} catch (err) {
						throw err;
					}
				});
			}
		)
	);
};
