import { Edit as EditIcon } from '@mui/icons-material';
import {
  Box,
  Button,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import apiRafaRolamentos from '../../service/api';
import { ActionContainer, Container, StyledButton, StyledTextField } from './style';

export function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ , setError] = useState(null);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalCreateOpen, setModalCreateOpen] = useState(false); // Modal para criar cliente
  const [newCliente, setNewCliente] = useState({ nome: '', email: '', telefone: '' }); // Estado para novo cliente
  const [selectedCliente, setSelectedCliente] = useState(null);

  const fetchClientes = async () => {
    try {
      const response = await apiRafaRolamentos.get('/cliente');
      setClientes(response.data);
      setLoading(false);
    } catch (err) {
      setError('Erro ao buscar clientes');
      setLoading(false);
    }
  };

  const handleSearch = (e) => setSearch(e.target.value);

  const handleEdit = async (id) => {
    try {
      const response = await apiRafaRolamentos.get(`/cliente/${id}`);
      setSelectedCliente(response.data);
      setModalOpen(true);
    } catch (err) {
      console.error('Erro ao buscar cliente:', err);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await apiRafaRolamentos.put(`/cliente/${selectedCliente.id_cliente}`, {
        nome: selectedCliente.nome,
        email: selectedCliente.email,
        telefone: selectedCliente.telefone,
      });

      fetchClientes(); // Atualiza a lista de clientes
      setModalOpen(false); // Fecha o modal
    } catch (err) {
      console.error('Erro ao atualizar cliente:', err);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
  
    try {
      // Pega o userId do localStorage
      const userData = localStorage.getItem('rafaRolamentos:userData');
      const userId = userData && JSON.parse(userData).id; // Ajuste conforme a estrutura do seu localStorage
  
      if (!userId) {
        console.error('Erro: userId não encontrado no localStorage');
        return;
      }
  
      // Faz a requisição POST com userId
      await apiRafaRolamentos.post('/cliente', { ...newCliente, userId });
  
      console.log('Cliente criado com sucesso');
      fetchClientes(); // Atualiza a lista de clientes
      setModalCreateOpen(false); // Fecha o modal de criação
      setNewCliente({ nome: '', email: '', telefone: '' }); // Limpa o estado
    } catch (err) {
      console.error('Erro ao criar cliente:', err);
    }
  }

  useEffect(() => {
    fetchClientes();
  }, []);

  const filteredClientes = clientes
    .filter((cliente) =>
      cliente.nome.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => a.nome.localeCompare(b.nome)); // Ordena a lista por nome

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Lista de Clientes
      </Typography>
      <ActionContainer>
        <StyledTextField
          label="Pesquisar Cliente"
          variant="outlined"
          value={search}
          onChange={handleSearch}
        />
        <StyledButton
          variant="contained"
          onClick={() => setModalCreateOpen(true)} // Abre o modal de criação
        >
          Criar Cliente
        </StyledButton>
      </ActionContainer>
      {loading ? (
        <Typography variant="h6" align="center">
          Carregando...
        </Typography>
      ) : (
        <TableContainer component={Paper} style={{ maxWidth: '800px', margin: '0 auto' }}>
          <Table>
            <TableHead>
              <TableRow>
              
                <TableCell>Nome</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Telefone</TableCell>
                <TableCell align="center">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredClientes.map((cliente) => (
                <TableRow key={cliente.id_cliente}>
                
                  <TableCell>{cliente.nome}</TableCell>
                  <TableCell>{cliente.email}</TableCell>
                  <TableCell>{cliente.telefone}</TableCell>
                  <TableCell align="center">
                    <Button onClick={() => handleEdit(cliente.id_cliente)}>
                      <EditIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Modal para Editar Cliente */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'white',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            maxWidth: '400px',
            width: '100%',
          }}
        >
          <Typography variant="h6" gutterBottom>
            Editar Cliente
          </Typography>
          {selectedCliente && (
            <form onSubmit={handleUpdate}>
              <TextField
                label="Nome"
                defaultValue={selectedCliente.nome}
                fullWidth
                margin="normal"
                onChange={(e) =>
                  setSelectedCliente({ ...selectedCliente, nome: e.target.value })
                }
              />
              <TextField
                label="Email"
                defaultValue={selectedCliente.email}
                fullWidth
                margin="normal"
                onChange={(e) =>
                  setSelectedCliente({ ...selectedCliente, email: e.target.value })
                }
              />
              <TextField
                label="Telefone"
                defaultValue={selectedCliente.telefone}
                fullWidth
                margin="normal"
                onChange={(e) =>
                  setSelectedCliente({ ...selectedCliente, telefone: e.target.value })
                }
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ marginTop: '10px' }}
              >
                Salvar Alterações
              </Button>
            </form>
          )}
        </Box>
      </Modal>

      {/* Modal para Criar Cliente */}
      <Modal open={modalCreateOpen} onClose={() => setModalCreateOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'white',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            maxWidth: '400px',
            width: '100%',
          }}
        >
          <Typography variant="h6" gutterBottom>
            Criar Cliente
          </Typography>
          <form onSubmit={handleCreate}>
            <TextField
              label="Nome"
              value={newCliente.nome}
              fullWidth
              margin="normal"
              onChange={(e) =>
                setNewCliente({ ...newCliente, nome: e.target.value })
              }
            />
            <TextField
              label="Email"
              value={newCliente.email}
              fullWidth
              margin="normal"
              onChange={(e) =>
                setNewCliente({ ...newCliente, email: e.target.value })
              }
            />
            <TextField
              label="Telefone"
              value={newCliente.telefone}
              fullWidth
              margin="normal"
              onChange={(e) =>
                setNewCliente({ ...newCliente, telefone: e.target.value })
              }
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: '10px' }}
            >
              Salvar
            </Button>
          </form>
        </Box>
      </Modal>
    </Container>
  );
}
