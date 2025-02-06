import { yupResolver } from '@hookform/resolvers/yup'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import Logo from '../../assets/Rafa_Rolamentos_logo Login.png'
import { ContainerButton } from '../../components/Button/styles'
import { ErrorMessage } from '../../components/ErrorMessage'
import { UserContext } from '../../hooks/UseContext'
import apiRafaRolamentos from '../../service/api'
import { Container, ContainerItens, Input, Label } from './styles'

// Interface para os dados do formulário
interface LoginFormData {
  email: string
  senha: string
}

export function Login() {
  const userContext = useContext(UserContext)
  const navigate = useNavigate()

  if (!userContext) {
    throw new Error('UserContext deve ser usado dentro de um UserProvider')
  }

  const { putUserData } = userContext

  const schema = Yup.object().shape({
    email: Yup.string()
      .email('Digite um e-mail válido')
      .required('O e-mail é obrigatório'),
    senha: Yup.string()
      .required('A senha é obrigatória')
      .min(6, 'A senha tem que ter pelo menos 6 dígitos'),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (clientData: LoginFormData) => {
    try {
      const { data } = await apiRafaRolamentos.post('/auth/login', {
        email: clientData.email,
        senha: clientData.senha,
      })

      console.log('Dados retornados pela API:', data)
      putUserData(data)
      toast.success('Seja Bem-vindo')

      setTimeout(() => {
        navigate('/')
      }, 1000)
    } catch (error: any) {
      console.error('Erro na requisição:', error)
      if (error.response?.status === 401) {
        toast.error('Verifique seu e-mail e senha')
      } else {
        toast.error('Ocorreu um erro ao processar a solicitação')
      }
    }
  }

  return (
    <Container>
      <ContainerItens>
        <img src={Logo} alt="logo-Rolamentos" />
        <h1>Login</h1>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Label>E-mail</Label>
          <Input
            type="email"
            {...register('email')}
            error={errors.email?.message}
            autoComplete="email"
          />
          <ErrorMessage>{errors.email?.message}</ErrorMessage>
          <Label>Senha</Label>
          <Input
            type="password"
            {...register('senha')}
            error={errors.senha?.message}
            autoComplete="current-password"
          />
          <ErrorMessage>{errors.senha?.message}</ErrorMessage>
          <a href="/esqueceu-senha">Esqueceu a Senha?</a>
          <ContainerButton
            type="submit"
            style={{
              justifySelf: 'center',
              alignSelf: 'center',
              marginTop: '30px',
            }}
          >
            Sign In
          </ContainerButton>
          {/* ao clicar no button com type onsubmit ele vai para a função onsubmit do form e da variavel lá em cima e te dá as informações no console.log */}
        </form>
      </ContainerItens>
    </Container>
  )
}
