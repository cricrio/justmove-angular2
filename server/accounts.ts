import { Accounts } from 'meteor/accounts-base';

Accounts.onCreateUser(function(options, user) {
    if (options.profile && user.services.facebook) {
        options.profile.picture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
        user.profile = options.profile;
    }

    if(user.services.password){
        user.profile = {};
        user.profile.name = user.username;
        user.profile.picture ="./user.png";
    }
    console.log(user);
    return user;
});
