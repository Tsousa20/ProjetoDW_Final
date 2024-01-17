// const { authenticate } = require('passport')

// const LocalStrategy = require('passport-local').Strategy

// function initialize(passport, getUserByName){
//     const authenticateUser = (admin_user_name, admin_passwd, done) => {
//         const user = getUserByName(admin_user_name)
//         if (user == null) {
//             return done(null, false, {message: 'No user with that username'})
//         }
//         try{
//             if(admin_passwd == owner_passwd){
//                 return done(null, user)
//             } else {
//                 return done(null, false, {message: 'Password Incorrect'})
//             }
//         } catch(e){
//             return done(e)
//         }
//     }        

//     passport.use(new LocalStrategy({usernameField: 'admin_user_name'}), authenticateUser)
//     passport.serializeUser((user, done) => {})
//     passport.deserializeUser((user, done) => {})
// }

// module.exports = initialize
