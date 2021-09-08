import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { errorResponse, formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import { IProduct } from '../../interfaces/product.interface';
import { mockProducts } from '../mock'

const getProducts: ValidatedEventAPIGatewayProxyEvent<{ products: IProduct[] }> = async () => {
  const products = mockProducts;
  if (products) {
    return formatJSONResponse({ products: products });
  } else {
    return errorResponse();
  }
}

export const main = middyfy(getProducts);
