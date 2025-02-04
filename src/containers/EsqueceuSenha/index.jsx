import { yupResolver } from '@hookform/resolvers/yup'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import { useNavigate } from 'react-router-dom'
import Logo from '../../assets/Rafa_Rolamentos_logo Login.png'
import { ContainerButton } from '../../components/Button/styles'
import { ErrorMessage } from '../../components/ErrorMessage/index.jsx'
import { UserContext } from '../../hooks/UseContext.jsx'
import apiRafaRolamentos from '../../service/api.js'
import { Container, ContainerItens, Input, Label } from './styles'

export function EsqueceuSenha() {
  const { putUserData } = useContext(UserContext)
  const navigate = useNavigate()

  const schema = Yup.object().shape({
    email: Yup.string()
      .email('Digite um e-mail válido')
      .required('O e-mail é obrigatório'),
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
      const { data } = await apiRafaRolamentos.post('auth/recover-password', {
        email: clientData.email,
      })
      putUserData(data)
      // Lógica de sucesso
      toast.success(
        'Se um usuário com este email existe, as instruções foram enviadas.'
      )

      setTimeout(() => {
        if (data.admin) {
          navigate('/login')
        } else {
          navigate('/login') //alterar depois essa rota
        }
      }, 1000)
      // settimeout junto com o UseHystory fazem a página ser redirecionada para o HOME após ser efetuado o login (1segundo depois)
    } catch (error) {
      console.error('Erro na requisição:', error)
      if (error.response && error.response.status === 401) {
        // Exibir mensagem específica para erro 401
        toast.error('Verifique seu e-mail', error)
      } else {
        // Exibir mensagem genérica para outros erros
        toast.error('Ocorreu um erro ao processar a solicitação', error)
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
