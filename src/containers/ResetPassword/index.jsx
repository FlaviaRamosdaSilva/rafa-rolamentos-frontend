import { yupResolver } from '@hookform/resolvers/yup'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import Logo from '../../assets/Rafa_Rolamentos_logo Login.png'
import { ContainerButton } from '../../components/Button/styles'
import { ErrorMessage } from '../../components/ErrorMessage/index.jsx'
import { UserContext } from '../../hooks/UseContext.jsx'
import apiRafaRolamentos from '../../service/api.js'
import { Container, ContainerItens, Input, Label } from './styles'

export function ResetPassword() {
  const { recoverToken } = useParams() // Pega o token da URL

  const { putUserData } = useContext(UserContext)
  const navigate = useNavigate()

  const schema = Yup.object().shape({
    newPassword: Yup.string()
      .required('A senha é obrigatória')
      .min(6, 'A senha tem que ter pelo menos 6 dígitos'),
    confirmPassword: Yup.string()
      .required('A confirmação da senha é obrigatória')
      .oneOf([Yup.ref('newPassword'), null], 'As senhas não coincidem'),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (clientData) => {
    try {
      const { data } = await apiRafaRolamentos.patch(
        `/user/reset-password/${recoverToken}`, // Corrigido para usar o recoverToken  da URL
        {
          newPassword: clientData.newPassword,
        }
      )
      console.log('Dados retornados pela API:', data)
      putUserData(data)
      toast.success('Senha alterada com sucesso')

      setTimeout(() => {
        navigate('/login')
      }, 1000)
    } catch (error) {
      console.error('Erro na requisição:', error)
      if (error.response && error.response.status === 401) {
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
        <h1>Nova Senha</h1>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Label>Nova Senha</Label>
          <Input
            type="password"
            {...register('newPassword')}
            error={errors.newPassword?.message}
            autoComplete="current-password"
          />
          <ErrorMessage>{errors.senha?.message}</ErrorMessage>
          <Label>Confirmação da senha</Label>
          <Input
            type="password"
            {...register('confirmPassword')}
            error={errors.confirmPassword?.message}
            autoComplete="current-password"
          />
          <ErrorMessage>{errors.confirmPassword?.message}</ErrorMessage>
          <ContainerButton
            type="submit"
            style={{
              justifySelf: 'center',
              alignSelf: 'center',
              marginTop: '30px',
            }}
          >
            Alterar Senha
          </ContainerButton>
          {/* ao clicar no button com type onsubmit ele vai para a função onsubmit do form e da variavel lá em cima e te dá as informações no console.log */}
        </form>
      </ContainerItens>
    </Container>
  )
}
