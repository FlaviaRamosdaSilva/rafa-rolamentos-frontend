import { yupResolver } from '@hookform/resolvers/yup'
import { useContext } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import Logo from '../../assets/Rafa_Rolamentos_logo Login.png'
import { ContainerButton } from '../../components/Button/styles'
import { ErrorMessage } from '../../components/ErrorMessage/index'
import { UserContext } from '../../hooks/UseContext'
import apiRafaRolamentos from '../../service/api'
import { Container, ContainerItens, Input, Label } from './styles'

// Definição do tipo para os dados do formulário
interface RecoverPasswordForm {
  email: string
}

export function EsqueceuSenha() {
  const userContext = useContext(UserContext)

  const putUserData = userContext?.putUserData || (() => {})

  const navigate = useNavigate()

  // Esquema de validação com Yup
  const schema = Yup.object().shape({
    email: Yup.string()
      .email('Digite um e-mail válido')
      .required('O e-mail é obrigatório'),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RecoverPasswordForm>({
    resolver: yupResolver(schema),
  })

  const onSubmit: SubmitHandler<RecoverPasswordForm> = async (clientData) => {
    try {
      const { data } = await apiRafaRolamentos.post('auth/recover-password', {
        email: clientData.email,
      })

      putUserData(data)

      // Lógica de sucesso
      toast.success(
        'Se um usuário com este email existe, as instruções foram enviadas.'
      )

      setTimeout(() => {
        navigate('/login')
      }, 1000)
    } catch (error: any) {
      console.error('Erro na requisição:', error)
      if (error.response?.status === 401) {
        toast.error('Verifique seu e-mail')
      } else {
        toast.error('Ocorreu um erro ao processar a solicitação')
      }
    }
  }

  return (
    <Container>
      <ContainerItens>
        <img src={Logo} alt="logo-Rolamentos" />
        <h1>Recuperação de senha</h1>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Label>
            Digite seu e-mail para enviarmos um token de recuperação de senha:
          </Label>
          <Input
            type="email"
            {...register('email')}
            error={errors.email?.message}
            autoComplete="email"
          />
          <ErrorMessage>{errors.email?.message}</ErrorMessage>

          <ContainerButton
            type="submit"
            style={{
              justifySelf: 'center',
              alignSelf: 'center',
              marginTop: '30px',
            }}
          >
            Recuperar senha
          </ContainerButton>
          {/* ao clicar no button com type onsubmit ele vai para a função onsubmit do form e da variavel lá em cima e te dá as informações no console.log */}
        </form>
      </ContainerItens>
    </Container>
  )
}
