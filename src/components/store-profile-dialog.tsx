import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import {
  getManagedRestaurant,
  GetManagedRestaurantResponse,
} from '@/api/get-managed-restaurant'
import { updateStoreProfile } from '@/api/update-store-profile'

import { Button } from './ui/button'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'

const storeProfileSchema = z.object({
  name: z.string().min(1),
  description: z.string().nullable(),
})

type StoreProfileSchema = z.infer<typeof storeProfileSchema>

export const StoreProfileDialog = ({
  onOpenChange,
}: {
  onOpenChange: (state: boolean) => void
}) => {
  const queryClient = useQueryClient()

  const { data: restaurant } = useQuery({
    queryKey: ['managed-restaurant'],
    queryFn: getManagedRestaurant,
    staleTime: Infinity,
  })

  const { mutateAsync: updateStoreProfileFn } = useMutation({
    mutationFn: updateStoreProfile,
    onMutate({ name, description }) {
      const { cached } = updateManagedRestaurantCache({ name, description })

      return { previousProfile: cached }
    },
    onError(_, __, context) {
      if (context?.previousProfile) {
        updateManagedRestaurantCache(context.previousProfile)
      }
    },
  })

  const { register, handleSubmit } = useForm<StoreProfileSchema>({
    resolver: zodResolver(storeProfileSchema),
    values: {
      name: restaurant?.name ?? '',
      description: restaurant?.description ?? '',
    },
  })

  const updateManagedRestaurantCache = (data: StoreProfileSchema) => {
    const cached = queryClient.getQueryData<GetManagedRestaurantResponse>([
      'managed-restaurant',
    ])

    if (cached) {
      queryClient.setQueryData<GetManagedRestaurantResponse>(
        ['managed-restaurant'],
        {
          ...cached,
          name: data.name,
          description: data.description,
        },
      )
    }

    return { cached }
  }

  const handleUpdateStoreProfile = async (data: StoreProfileSchema) => {
    try {
      await updateStoreProfileFn({
        name: data.name,
        description: data.description,
      })

      toast.success('Perfil atualizado com sucesso!')
      onOpenChange(false)
    } catch {
      toast.error('Falha ao atualizar o perfil, tente novamente!')
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil da loja</DialogTitle>
        <DialogDescription>
          Atualize as informações do seu estabelecimento visíveis ao seu cliente
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(handleUpdateStoreProfile)}>
        <div className="gap-4 space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="name">
              Nome
            </Label>
            <Input className="col-span-3" id="name" {...register('name')} />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="description">
              Descrição
            </Label>
            <Textarea
              className="col-span-3"
              id="description"
              {...register('description')}
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button type="submit" variant="success">
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
