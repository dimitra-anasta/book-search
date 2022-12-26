const {Book, User} = require('../models');
const {signToken} = require('../utils/auth');
const {AuthenticationError} = require('apollo-server-express');

const resolvers = {
    Query: {
        users: async () => {
            return User.find({});
        },
        user: async (parent, {userId}) => {
            return User.findOne({_id: userId})
        },
        me: async (parent, args, context) => {
          console.log(context)
        if (context.user) { 
          const userData = await User.findOne({_id: context.user._id }) 
          return userData
        }
        throw new AuthenticationError('You need to be logged in!');
        }, 
    },
    Mutation:{
    login: async (parent, {email, password}) => {
      const login = await User.findOne({email});
      if (!login) {
        throw new AuthenticationError('No profile with this email found!')
      }
      const correctPassword = await login.isCorrectPassword(password);
      if(!correctPassword){
        throw new AuthenticationError('Incorrect password!')
      }
     const token = signToken(login)
     console.log(login)
     return { token, login};
    },
    addUser: async (parent, { email, username, password  }) => {
        const user = await User.create({ username, email, password})
        const token = signToken(user)
        return {token, user};
    },
    saveBook: async (parent, args, context) => {
        if (context.user) {
          const updatedUser = await User.findByIdAndUpdate(
            { _id: context.user._id },
            { $push: { savedBooks: args.input } },
            { new: true }
          );
          return updatedUser;
        }
        throw new AuthenticationError('You need to be logged in!');
      },
    removeBook: async (parent, {book }, context) => {
        if (context.book){
        return User.findOneAndDelete({ 
            _id: context.user._id },
            {$pull: {savedBooks: book}},
            {new: true}
            );
    }
    }
}

};


module.exports = resolvers;