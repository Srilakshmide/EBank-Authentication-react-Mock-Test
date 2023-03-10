import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {userId: '', pin: '', showErrorMsg: false, errorMsg: ''}

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showErrorMsg: true, errorMsg})
  }

  onChangePin = event => {
    this.setState({pin: event.target.value})
  }

  onChangeUserID = event => {
    this.setState({userId: event.target.value})
  }

  renderPasswordField = () => {
    const {pin} = this.state

    return (
      <div className="input-container">
        <label htmlFor="password" className="input-label">
          PIN
        </label>
        <input
          type="password"
          id="password"
          value={pin}
          onChange={this.onChangePin}
          className="user-input"
          placeholder="Enter PIN"
        />
      </div>
    )
  }

  renderUsernameField = () => {
    const {userId} = this.state

    return (
      <div className="input-container">
        <label htmlFor="username" className="input-label">
          User ID
        </label>
        <input
          type="text"
          id="username"
          value={userId}
          onChange={this.onChangeUserID}
          className="user-input"
          placeholder="Enter User ID"
        />
      </div>
    )
  }

  submitForm = async event => {
    event.preventDefault()

    const {userId, pin} = this.state
    const userDetails = {userId, pin}
    console.log(userId)
    console.log(pin)

    const url = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {showErrorMsg, errorMsg} = this.state

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-container">
        <div className="main-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
            className="website-logo"
          />
          <form className="login-form" onSubmit={this.submitForm}>
            <h1 className="login-head">Welcome Back!</h1>
            {this.renderUsernameField()}
            {this.renderPasswordField()}
            <button type="submit" className="login-button">
              Login
            </button>
            {showErrorMsg && <p className="error-msg">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
