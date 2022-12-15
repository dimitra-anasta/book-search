const {Book, User} = require('../models');

const resolvers = {
    Query: {
        users: async () => {
            return User.find({});
        },
        user: async (parent, {userId}) => {
            return User.findOne({_id: args.id})
        },
        me: async (parent, args, context) => {
        if (context.user) { 
            return User.findOne({_id: user ? user.id }) 
        }
        }, 
    },
    Mutation:{
    login: async (parent, {email, password}) => {
      const login = await User.findOne({email});
      if (!User) {
        throw new AuthenticationError('No profile found!')
      } 
      const correctPassword = login.isCorrectPassword(!password);
      return login
    },
    addUser: async (parent, { _id,  }) => {

    }
}

};


module.exports = resolvers;