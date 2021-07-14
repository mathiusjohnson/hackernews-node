function feed(parent, args, context, info) {
  console.log(context);
  return context.prisma.link.findMany()
}

module.exports = {
  feed,
}