import { prisma } from '$lib/graphql/client';

export const contacts = () => {
	return prisma.user.findMany();
};

export const contact = ({ id }) => {
	return prisma.user.findUnique({
		where: { id }
	});
};

export const createContact = ({ input }) => {
	console.log(input);
	return prisma.user.create({
		data: input
	});
};

export const updateContact = ({ id, input }) => {
	return prisma.user.update({
		data: input,
		where: { id }
	});
};

export const deleteContact = ({ id }) => {
	return prisma.user.delete({
		where: { id }
	});
};
