const {Book, User} = require('../models');

const resolvers = {
    Query: {
        bookId: async () => {
            return SearchBooks.find({});
        },
        
    }
}