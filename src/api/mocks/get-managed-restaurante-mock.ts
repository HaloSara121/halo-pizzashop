import { http, HttpResponse } from 'msw'

import { GetManagedRestaurantResponse } from '../get-managed-restaurant'

export const getManagedRestaurantMock = http.get<
  never,
  never,
  GetManagedRestaurantResponse
>('/managed-restaurant', () => {
  return HttpResponse.json({
    id: 'unique-restaurant-id',
    name: 'Pizza Shop',
    description: 'Restaurant description',
    managerId: 'unique-user-id',
    createdAt: new Date(),
    updatedAt: null,
  })
})
