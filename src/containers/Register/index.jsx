import { yupResolver } from '@hookform/resolvers/yup';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/Rafa_Rolamentos_logo Login.png';
import { ContainerButton } from '../../components/Button/styles';
import { ErrorMessage } from '../../components/ErrorMessage/index.jsx';
import { UserContext } from '../../hooks/UseContext.jsx';
import api from '../../service/api';
import { Container, ContainerItens, Input, Label } from './styles';

export function Login() {
  const { putUserData } = useContext(UserContext);
  const navigate = useNavigate();

  const schema = Yup.object().shape({
    email: Yup.string()
      .email('Digite um e-mail válido')
      .required('O e-mail é obrigatório'),
    senha: Yup.string()
      .required('A senha é obrigatória')
      .min(6, 'A senha tem que ter pelo menos 6 dígitos'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (clientData) => {
    try {
      const { data } = await api.post('/auth/login', {
        email: clientData.email,
        senha: clientData.senha,
      });
      console.log('Dados retornados pela API:', data); // Verifica os dados retornados
      putUserData(data);
      // Lógica de sucesso
      toast.success('Seja Bem-vindo');

      setTimeout(() => {
        if (data.admin) {
          navigate('/');
        } else {
          navigate('/'); //alterar depois essa rota
        }
      }, 1000);
      // settimeout junto com o UseHystory fazem a página ser redirecionada para o HOME após ser efetuado o login (1segundo depois)
    } catch (error) {
      console.error('Erro na requisição:', error);
      if (error.response && error.response.status === 401) {
        // Exibir mensagem específica para erro 401
        toast.error('Verifique seu e-mail e senha');
      } else {
        // Exibir mensagem genérica para outros erros
        toast.error('Ocorreu um erro ao processar a solicitação');
      }
    }
  };

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
          <a href="/">Esqueceu a Senha?</a>
          <ContainerButton
            type="submit"
             style={{ justifySelf: 'center', alignSelf: 'center', marginTop: '30px' }}
          >
            Sign In
          </ContainerButton>
          {/* ao clicar no button com type onsubmit ele vai para a função onsubmit do form e da variavel lá em cima e te dá as informações no console.log */}
        </form>
       
      </ContainerItens>
    </Container>
  );
}