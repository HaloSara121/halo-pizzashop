import { api } from '@/lib/axios'

export interface UpdateStoreProfileBody {
  name: string
  description: string | null
}

export async function updateStoreProfile({
  name,
  description,
}: UpdateStoreProfileBody) {
  await api.put('/profile', { name, description })
}
