const {Book, User} = require('../models');

const resolvers = {
    Query: {
        users: async () => {
            return User.find({});
        },
        user: async (parent, {userId}) => {
            return User.findOne({_id: userId})
        },
        me: async (parent, args, context) => {
        if (context.user) { 
            return findOne() 
        }
        }, 
    },
    Mutation:

}