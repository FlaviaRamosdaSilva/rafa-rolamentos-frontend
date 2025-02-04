import { yupResolver } from '@hookform/resolvers/yup'
import {
  Box,
  Button,
  MenuItem,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import apiRafaRolamentos from '../../service/api'

export function EditarProduto() {
  const { id } = useParams()
  const [tabIndex, setTabIndex] = useState(0)
  const navigate = useNavigate()
  const [selectedProduto, setSelectedProduto] = useState(null)
  const [historico, setHistorico] = useState([])

  // Esquema de validação com Yup
  const editarProdutoSchema = Yup.object().shape({
    codigo_produto: Yup.string().required('O código do produto é obrigatório.'),
    descricao_produto: Yup.string()
      .min(10, 'A descrição deve ter pelo menos 10 caracteres.')
      .required('A descrição do produto é obrigatória.'),
    fabricante: Yup.string().required('O fabricante é obrigatório.'),
    categoria: Yup.string().required('A categoria é obrigatória.'),
    custo: Yup.number()
      .typeError('Utilize vírgulas para valor decimal')
      .positive('O custo deve ser um valor positivo.')
      .required('O custo é obrigatório.'),
    preco_lojista: Yup.number()
      .typeError('Utilize vírgulas para valor decimal')
      .positive('O preço para lojista deve ser um valor positivo.')
      .required('O preço para lojista é obrigatório.'),
    preco_distribuidor: Yup.number()
      .typeError('Utilize vírgulas para valor decimal')
      .positive('O preço para distribuidor deve ser um valor positivo.')
      .required('O preço para distribuidor é obrigatório.'),
    quantidade_total: Yup.number()
      .integer('A quantidade total deve ser um número inteiro.')
      .required('A quantidade total é obrigatória.'),
    quantidade_minima: Yup.number()
      .integer('A quantidade mínima deve ser um número inteiro.')
      .required('A quantidade mínima é obrigatória.'),
  })

  // Configuração do React Hook Form
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editarProdutoSchema),
    defaultValues: {
      codigo_produto: '',
      descricao_produto: '',
      fabricante: '',
      categoria: '',
      custo: '',
      preco_lojista: '',
      preco_distribuidor: '',
      quantidade_total: '',
      quantidade_minima: '',
    },
  })

  // Sincronizar os valores do formulário com os inputs
  const valoresForm = watch()

  // Buscar produto pelo ID e popular o formulário
  useEffect(() => {
    const fetchProduto = async () => {
      try {
        const response = await apiRafaRolamentos.get(`/produto/${id}`)
        console.log('Produto carregado:', response.data)
        setSelectedProduto(response.data)

        Object.keys(response.data).forEach((key) => {
          setValue(key, response.data[key]) //
          // Atualiza os valores do formulário corretamente
        })
      } catch (err) {
        toast.error('Erro ao carregar produto')
        navigate('/estoque')
      }
    }

    fetchProduto()
  }, [id, navigate, setValue])

  // Buscar histórico do produto
  useEffect(() => {
    const fetchHistorico = async () => {
      try {
        const response = await apiRafaRolamentos.get(`/produto/${id}/historico`)
        setHistorico(response.data)
      } catch (err) {
        toast.error('Erro ao carregar histórico do produto')
      }
    }

    if (tabIndex === 2) {
      fetchHistorico()
    }
  }, [id, tabIndex])

  // Envio do formulário
  const onSubmit = async (data) => {
    try {
      if (tabIndex === 0) {
        await apiRafaRolamentos.put(`/produto/${selectedProduto.id_produto}`, {
          codigo_produto: data.codigo_produto,
          descricao_produto: data.descricao_produto,
          fabricante: data.fabricante,
          categoria: data.categoria,
          custo: data.custo,
          preco_lojista: data.preco_lojista,
          preco_distribuidor: data.preco_distribuidor,
        })
      } else if (tabIndex === 1) {
        await apiRafaRolamentos.put(
          `/produto/estoque/${selectedProduto.id_produto}`,
          {
            quantidade_total: data.quantidade_total,
            quantidade_minima: data.quantidade_minima,
          }
        )
      }

      toast.success('Produto atualizado com sucesso!')
      navigate('/estoque')
    } catch (err) {
      toast.error('Erro ao atualizar produto')
    }
  }

  const handleGoToEstoque = () => {
    navigate('/Estoque')
  }

  return (
    <Box sx={{ maxWidth: 800, margin: '0 auto', mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Editar Produto:{' '}
          {selectedProduto?.descricao_produto || 'Carregando...'}
        </Typography>

        <Tabs
          value={tabIndex}
          onChange={(_, newValue) => setTabIndex(newValue)}
        >
          <Tab label="Dados do Produto" />
          <Tab label="Estoque" />
          <Tab label="Histórico" />
        </Tabs>

        <form onSubmit={handleSubmit(onSubmit)}>
          {tabIndex === 0 && (
            <Box mt={3}>
              <TextField
                label="Código"
                {...register('codigo_produto')}
                error={!!errors.codigo_produto}
                helperText={errors.codigo_produto?.message}
                fullWidth
                margin="normal"
                value={valoresForm.codigo_produto}
              />
              <TextField
                label="Descrição"
                {...register('descricao_produto')}
                error={!!errors.descricao_produto}
                helperText={errors.descricao_produto?.message}
                fullWidth
                margin="normal"
                value={valoresForm.descricao_produto}
              />
              <TextField
                label="Fabricante"
                {...register('fabricante')}
                error={!!errors.fabricante}
                helperText={errors.fabricante?.message}
                fullWidth
                margin="normal"
                value={valoresForm.fabricante}
              />
              <TextField
                select
                label="Categoria"
                {...register('categoria')}
                error={!!errors.categoria}
                helperText={errors.categoria?.message}
                fullWidth
                margin="normal"
                value={valoresForm.categoria}
              >
                <MenuItem value="Motor">Motor</MenuItem>
                <MenuItem value="Roda">Roda</MenuItem>
              </TextField>
              <TextField
                label="Custo"
                {...register('custo', {
                  setValueAs: (value) => value.replace(',', '.'),
                })}
                error={!!errors.custo}
                helperText={errors.custo?.message}
                type="text"
                fullWidth
                margin="normal"
                value={valoresForm.custo}
              />
              <TextField
                label="Preço Lojista"
                {...register('preco_lojista', {
                  setValueAs: (value) => value.replace(',', '.'),
                })}
                error={!!errors.preco_lojista}
                helperText={errors.preco_lojista?.message}
                type="text"
                fullWidth
                margin="normal"
                value={valoresForm.preco_lojista}
              />
              <TextField
                label="Preço Distribuidor"
                {...register('preco_distribuidor', {
                  setValueAs: (value) => value.replace(',', '.'),
                })}
                error={!!errors.preco_distribuidor}
                helperText={errors.preco_distribuidor?.message}
                type="text"
                fullWidth
                margin="normal"
                value={valoresForm.preco_distribuidor}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                Salvar Alterações
              </Button>
              <Button
                onClick={handleGoToEstoque}
                variant="contained"
                color="primary"
                sx={{
                  mt: 2,
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: 2,
                }}
              >
                Voltar
              </Button>
            </Box>
          )}

          {tabIndex === 1 && (
            <Box mt={3}>
              <TextField
                label="Qtd Total"
                {...register('quantidade_total')}
                error={!!errors.quantidade_total}
                helperText={errors.quantidade_total?.message}
                type="number"
                fullWidth
                margin="normal"
                value={valoresForm.quantidade_total}
              />
              <TextField
                label="Qtd Mínima"
                {...register('quantidade_minima')}
                error={!!errors.quantidade_minima}
                helperText={errors.quantidade_minima?.message}
                type="number"
                fullWidth
                margin="normal"
                value={valoresForm.quantidade_minima}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                Atualizar Estoque
              </Button>
              <Button
                onClick={handleGoToEstoque}
                variant="contained"
                color="primary"
                sx={{
                  mt: 2,
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: 2,
                }}
              >
                Voltar
              </Button>
            </Box>
          )}
          {tabIndex === 2 && (
            <Box mt={3}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Data</TableCell>
                      <TableCell>Tipo de Alteração</TableCell>
                      <TableCell>Descrição</TableCell>
                      <TableCell>Nova Quantidade</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {historico.length > 0 ? (
                      historico.map((estoqueLog) => {
                        // Verifica se a data está disponível e formata corretamente
                        const dataFormatada = estoqueLog.createdAt
                          ? new Date(estoqueLog.createdAt).toLocaleDateString(
                              'pt-BR'
                            )
                          : 'Data não disponível'

                        return (
                          <TableRow key={estoqueLog.id}>
                            <TableCell>{dataFormatada}</TableCell>
                            <TableCell>{estoqueLog.tipo}</TableCell>
                            <TableCell>{estoqueLog.descricao}</TableCell>
                            <TableCell>{estoqueLog.quantidade}</TableCell>
                          </TableRow>
                        )
                      })
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} align="center">
                          Nenhum histórico encontrado para este produto.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <Button
                onClick={handleGoToEstoque}
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                Voltar
              </Button>
            </Box>
          )}
        </form>
      </Paper>
    </Box>
  )
}
