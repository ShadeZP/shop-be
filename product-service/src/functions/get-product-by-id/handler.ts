import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { errorResponse, formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import { IProduct } from '../../interfaces/product.interface';
import { mockProducts } from '../mock'

const getProductById: ValidatedEventAPIGatewayProxyEvent<{ product: IProduct }> = async (event) => {
  const { id } = event.pathParameters;
  const product = await mockProducts.find((product: IProduct) => product.id === id.toString());
  if (product) {
    return formatJSONResponse({
      product: product,
    });
  } else {
    return errorResponse();
  }
}

export const main = middyfy(getProductById);
