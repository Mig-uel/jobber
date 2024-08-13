import { Link } from 'react-router-dom'
import { Wrapper } from '../../styled/Landing'

// images
import main from '../../assets/images/main.svg'
import logo from '../../assets/images/logo.svg'

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <img src={logo} alt='jobber logo' className='logo' />
      </nav>
      <div className='container page'>
        <h1>
          Job <span>Tracking</span> App
        </h1>
        <p>
          I'm baby beard taiyaki humblebrag tumeric pitchfork DSA lyft
          sustainable pabst master cleanse man braid gluten-free. Jawn vinyl
          single-origin coffee four loko. Bruh hexagon retro listicle chillwave
          bushwick deep v four dollar toast, 8-bit grailed yr PBR&B. JOMO
          whatever helvetica, church-key quinoa mumblecore DIY intelligentsia
          craft beer keytar.
        </p>
        <Link to='/register' className='btn register-link'>
          Register
        </Link>
        <Link to='/login' className='btn'>
          Login / Demo User
        </Link>
      </div>
      <img src={main} alt='job hunt' className='img main-img' />
    </Wrapper>
  )
}

export default Landing
