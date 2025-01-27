import { useNavigate } from 'react-router-dom'
import Logo from '../../assets/Rafa_Rolamentos-header.png'
import { Container } from './style'

export const Header = () => {
  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate('/inicio')
  }

  return (
    <Container>
      <img 
        src={Logo} 
        className="logo" 
        alt="LogoRafaRolamentos" 
        onClick={handleNavigate}
        style={{ cursor: 'pointer' }}
      />
    </Container>
  )
}
