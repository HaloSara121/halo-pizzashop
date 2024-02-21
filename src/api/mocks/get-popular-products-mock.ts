import { http, HttpResponse } from 'msw'

import { GetPopularProductsResponse } from '../get-popular-products'

export const getPopularProductsMock = http.get<
  never,
  never,
  GetPopularProductsResponse
>('/metrics/popular-products', () => {
  return HttpResponse.json([
    { product: 'Pizza 1', amount: 20 },
    { product: 'Pizza 2', amount: 80 },
    { product: 'Pizza 3', amount: 25 },
    { product: 'Pizza 4', amount: 15 },
    { product: 'Pizza 5', amount: 10 },
  ])
})
