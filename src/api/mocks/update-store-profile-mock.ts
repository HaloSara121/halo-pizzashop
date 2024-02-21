import { http, HttpResponse } from 'msw'

import { UpdateStoreProfileBody } from '../update-store-profile'

export const updateStoreProfileMock = http.put<never, UpdateStoreProfileBody>(
  '/profile',
  async ({ request }) => {
    const { name } = await request.json()

    if (name === 'Rocket Pizza') {
      return new HttpResponse(null, { status: 204 })
    }

    return new HttpResponse(null, { status: 400 })
  },
)
