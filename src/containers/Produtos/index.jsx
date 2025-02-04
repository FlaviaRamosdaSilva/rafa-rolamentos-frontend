import { yupResolver } from '@hookform/resolvers/yup'
import { MenuItem } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import apiRafaRolamentos from '../../service/api'

import {
  ContainerMe,
  FieldContainer,
  FormContainer,
  FormPaper,
  FormTitle,
  StyledButton,
  StyledTextField,
} from './style'

export function Produtos() {
  // Schema de validação com Yup
  const produtoSchema = Yup.object().shape({
    codigo_produto: Yup.string().required('O código do produto é obrigatório.'),
    descricao_produto: Yup.string()
      .min(10)
      .required('A descrição do produto é obrigatória.'),
    fabricante: Yup.string().required('O fabricante é obrigatório.'),
    categoria: Yup.string().required('A categoria é obrigatória.'),
    quantidade_total: Yup.number()
      .integer('A quantidade total deve ser um número inteiro.')
      .required('A quantidade total é obrigatória.'),
    quantidade_minima: Yup.number()
      .integer('A quantidade mínima deve ser um número inteiro.')
      .required('A quantidade mínima é obrigatória.'),
    custo: Yup.number()
      .typeError('Utilize vírgulas para valor decimal')
      .positive('O custo deve ser um valor positivo.')
      .required('O custo é obrigatório.'),
    preco_lojista: Yup.number()
      .typeError('Utilize vírgulas para valor decimal')
      .positive('O preço para distribuidor deve ser um valor positivo.')
      .required('O preço para lojista é obrigatório.'),
    preco_distribuidor: Yup.number()
      .typeError('Utilize vírgulas para valor decimal')
      .positive('O preço para lojista deve ser um valor positivo.')
      .required('O preço para distribuidor é obrigatório.'),
  })

  // Configuração do React Hook Form com Yup
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(produtoSchema),
  })

  const navigate = useNavigate()

  // Função de submissão do formulário
  const onSubmit = async (data) => {
    try {
      // Pega o userId do localStorage// Pega o userId do localStorage
      const userData = localStorage.getItem('rafaRolamentos:userData')
      const userId = userData && JSON.parse(userData).id // Ajuste conforme a estrutura do seu localStorage

      if (!userId) {
        console.error('Erro: userId não encontrado no localStorage')
        return
      }

      await apiRafaRolamentos.post('/produto', { ...data, userId })
      toast.success('Produto criado com sucesso!')

      reset()

      setTimeout(() => navigate('/estoque'), 1000)
    } catch (err) {
      console.error('Erro ao criar produto:', err)
      toast.error('Erro ao criar produto. Verifique os campos.')
    }
  }

  return (
    <ContainerMe maxWidth="sm" sx={{ mt: 4 }}>
      <FormPaper elevation={3} sx={{ p: 4 }}>
        <FormTitle>Criar Produto</FormTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormContainer>
            <FieldContainer>
              <StyledTextField
                label="Código do Produto"
                {...register('codigo_produto')}
                error={!!errors.codigo_produto}
                helperText={errors.codigo_produto?.message}
                fullWidth
                margin="normal"
              />
            </FieldContainer>
            <FieldContainer>
              <StyledTextField
                label="Descrição do Produto"
                {...register('descricao_produto')}
                error={!!errors.descricao_produto}
                helperText={errors.descricao_produto?.message}
                fullWidth
                margin="normal"
              />
            </FieldContainer>
            <FieldContainer>
              <StyledTextField
                label="Fabricante"
                {...register('fabricante')}
                error={!!errors.fabricante}
                helperText={errors.fabricante?.message}
                fullWidth
                margin="normal"
              />
            </FieldContainer>
            <FieldContainer>
              <StyledTextField
                select
                label="Categoria"
                {...register('categoria')}
                error={!!errors.categoria}
                helperText={errors.categoria?.message}
                fullWidth
                margin="normal"
              >
                <MenuItem value="Motor">Motor</MenuItem>
                <MenuItem value="Roda">Roda</MenuItem>
              </StyledTextField>
            </FieldContainer>
            <FieldContainer>
              <StyledTextField
                label="Custo"
                {...register('custo', {
                  setValueAs: (value) => value.replace(',', '.'),
                })}
                error={!!errors.custo}
                helperText={errors.custo?.message}
                type="text"
                fullWidth
                margin="normal"
              />
            </FieldContainer>
            <FieldContainer>
              <StyledTextField
                label="Preço para Lojista"
                {...register('preco_lojista', {
                  setValueAs: (value) => value.replace(',', '.'),
                })}
                error={!!errors.preco_lojista}
                helperText={errors.preco_lojista?.message}
                type="text"
                fullWidth
                margin="normal"
              />
            </FieldContainer>
            <FieldContainer>
              <StyledTextField
                label="Preço para Distribuidor"
                {...register('preco_distribuidor', {
                  setValueAs: (value) => value.replace(',', '.'),
                })}
                error={!!errors.preco_distribuidor}
                helperText={errors.preco_distribuidor?.message}
                type="text"
                fullWidth
                margin="normal"
              />
            </FieldContainer>
            <FieldContainer>
              <StyledTextField
                label="Quantidade Total"
                {...register('quantidade_total')}
                error={!!errors.quantidade_total}
                helperText={errors.quantidade_total?.message}
                type="number"
                fullWidth
                margin="normal"
              />
            </FieldContainer>
            <FieldContainer>
              <StyledTextField
                label="Quantidade Mínima"
                {...register('quantidade_minima')}
                error={!!errors.quantidade_minima}
                helperText={errors.quantidade_minima?.message}
                type="number"
                fullWidth
                margin="normal"
              />
            </FieldContainer>
          </FormContainer>
          <StyledButton
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Salvar Produto
          </StyledButton>
        </form>
      </FormPaper>
    </ContainerMe>
  )
}
