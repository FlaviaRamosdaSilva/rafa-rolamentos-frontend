import axios from 'axios'
// conforme documentação do axios

const apiRafaRolamentos = axios.create({
  baseURL: process.env.REACT_APP_API_URL // endereço do backend => FALTA ADICIONAR
})

apiRafaRolamentos.interceptors.request.use(async config => {
  const userData = await localStorage.getItem('rafarolamentos:userData') // trocar para cache
  const token = userData && JSON.parse(userData).token
  config.headers.Authorization = `Bearer ${token}`
  return config
})
// as informações acima fazem o seguinte: ele vai interceptar, antes de criar a requesição, vamos adicionar o token;
// no userData nós pegamos a informação da key especificada no getitem; depois no token nós colocamos o userData para não quebrar, mas quando tiver algo no localstorage
// ele vai retransformar em objeto com o parse e vai pegar só o item token;
// conforme nosso backend, precisamos ter o Bearer+espaço+token no item que será analisado, então pegamos o token e fazemos isso. o token ta dentro do headers.autorization, conforme backend,
// toda vez que ele fizer uma requisição ele vai passar aqui e pegar essas configurações.

export default apiRafaRolamentos