import { prisma } from '$lib/graphql/client';

export const posts = () => {
  return prisma.post.findMany()
}

export const post = ({ id }) => {
  return prisma.post.findUnique({
    where: { id },
  })
}


export const createPost = ({ input }) => {
  return prisma.post.create({
    data: input,
  })
}

export const updatePost = ({ id, input }) => {
  return prisma.post.update({
    data: input,
    where: { id },
  })
}

export const deletePost = ({ id }) => {
  return prisma.post.delete({
    where: { id },
  })
}
