import { prisma } from '$lib/graphql/client';

export const users = () => {
	return prisma.user.findMany();
};

export const user = ({ id }) => {
	return prisma.user.findUnique({
		where: { id }
	});
};

export const createUser = ({ input }) => {
	return prisma.user.create({
		data: input
	});
};

export const updateUser = ({ id, input }) => {
	return prisma.user.update({
		data: input,
		where: { id }
	});
};

export const deleteUser = ({ id }) => {
	return prisma.user.delete({
		where: { id }
	});
};
