import prisma from '../util/prisma';

export const resolvers = {
    // 3 optional args for resolver
    // _parents return value of resolver
    // args object contains all graphql provided for field eg: an id
    // ctx (context) passing things resolver might need, eg: authentication code, db connections, custom fetch functions
    Query: {
        Tasks: async {_parents, args, ctx} => await ctx.prisma.task.findMany(),
    }
}
