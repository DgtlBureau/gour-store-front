import {IProductGrade} from '../types/entities/IProductGrade';

export const getProductReviews = (comments: IProductGrade[]) =>
    comments
        .filter(i => i.isApproved && !!i.comment && i.product)
        .map(({ id, client, value, createdAt, comment,product }) => ({
            id,
            productId: product.id,
            clientName: client ? `${client.firstName} ${client.lastName}` : 'Клиент',
            value,
            date: new Date(createdAt),
            comment,
            clientId: client?.id,
        }));
