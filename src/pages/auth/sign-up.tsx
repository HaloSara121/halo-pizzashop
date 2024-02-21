import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import * as z from 'zod'

import { registerRestaurant } from '@/api/register-restaurant'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const signUpFormSchema = z.object({
  restaurantName: z.string().min(1, 'Campo nome do restaurante é obrigatório!'),
  managerName: z.string().min(1, 'Campo nome é obrigatório!'),
  phone: z.string().min(1, 'Campo nome é obrigatório!'),
  email: z.string().email().min(1, 'Campo e-mail é obrigatório!'),
})

type SignUpFormData = z.infer<typeof signUpFormSchema>

export function SignUp() {
  const navigate = useNavigate()

  const { mutateAsync: registerRestaurantFn } = useMutation({
    mutationFn: registerRestaurant,
  })

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      restaurantName: '',
      managerName: '',
      phone: '',
      email: '',
    },
  })

  const handleSignUp = async (data: SignUpFormData) => {
    try {
      await registerRestaurantFn({
        restaurantName: data.restaurantName,
        managerName: data.managerName,
        phone: data.phone,
        email: data.email,
      })

      toast.success('Restaurante cadastrado com sucesso', {
        action: {
          label: 'Login',
          onClick: () => navigate(`/sign-in?email=${data.email}`),
        },
      })
    } catch (error) {
      toast.error('Erro ao cadastrar restaurante!')
    }
  }

  return (
    <>
      <Helmet title="Cadastro" />

      <div className="p-8">
        <Button variant="outline" className="absolute right-8 top-8">
          <Link to="/sign-in">Fazer login</Link>
        </Button>

        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Criar conta grátis
            </h1>
            <p className="text-sm text-muted-foreground">
              Seja um parceiro e comece suas vendas!
            </p>
          </div>

          <form
            onSubmit={handleSubmit(handleSignUp)}
            className="flex flex-col space-y-4 "
          >
            <div className="space-y-2">
              <Label htmlFor="restaurantName">Nome do estabelecimento</Label>
              <Input
                {...register('restaurantName')}
                id="restaurantName"
                type="text"
              />
              {errors.restaurantName && (
                <span className="text-sm text-destructive">
                  {errors.restaurantName.message}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="managerName">Seu nome</Label>
              <Input
                {...register('managerName')}
                id="managerName"
                type="text"
              />
              {errors.managerName && (
                <span className="text-sm text-destructive">
                  {errors.managerName.message}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input {...register('email')} id="email" type="email" />
              {errors.email && (
                <span className="text-sm text-destructive">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Seu celular</Label>
              <Input {...register('phone')} id="phone" type="tel" />
              {errors.phone && (
                <span className="text-sm text-destructive">
                  {errors.phone.message}
                </span>
              )}
            </div>

            <Button
              className="w-full"
              isLoading={isSubmitting}
              disabled={isSubmitting}
              type="submit"
            >
              Finalizar cadastro
            </Button>

            <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
              Ao continuar, você concorda com nossos <br />
              <a className="underline underline-offset-4" href="">
                termos de serviço
              </a>{' '}
              e{' '}
              <a className="underline underline-offset-4" href="">
                políticas de privacidade
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  )
}
