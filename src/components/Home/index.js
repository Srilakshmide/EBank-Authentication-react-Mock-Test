import Cookies from 'js-cookie'

import './index.css'

const Home = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/ebank/login')
  }

  return (
    <div className="bg-container">
      <div className="nav-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
          alt="website logo"
          className="logo"
        />
        <button type="button" className="logout-btn" onClick={onClickLogout}>
          Logout
        </button>
      </div>
      <h1 className="heading">Your Flexibility, Our Excellence</h1>
      <div className="image-card">
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
          alt="digital card"
          className="card-img"
        />
      </div>
    </div>
  )
}

export default Home
