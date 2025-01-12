import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import LoginStyle from '../styles/LoginStyle';
import { useLoginContext } from '../context/LoginContext';
import { auth } from '../../firebaseConfig';
import { useNavigate } from 'react-router';

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const { setIsLoggedIn, setUser, user } = useLoginContext()
  const [isSignUp, setIsSignUp] = useState(false)
    const navigate = useNavigate()

  const toggleForm = () => {
    setIsSignUp(!isSignUp)
  }

  const extractUsername = (email) => {
    return email.split('@')[0]
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      let userCredential
      if (isSignUp) {
        userCredential = await createUserWithEmailAndPassword(auth, email, password)
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password)
      }

      const username = extractUsername(userCredential.user.email)
      
      setUser(username)
      console.log("user logged as:",username)
      setIsLoggedIn(true)

      navigate('/')
    } catch (error) {
      setError(error.message)
    }
  }


  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider()
    try {
      const result = await signInWithPopup(auth, provider)
      const username = result.user.email
      console.log('User logged in with Google successfully:', username)
      setUser(username)
      setIsLoggedIn(true)
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <LoginStyle>
      <div className="login-form">
        <h2>{isSignUp ? 'Sign Up' : 'Login'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">{isSignUp ? 'Sign Up' : 'Log In'}</button>
        </form>
        <button onClick={handleGoogleLogin}>Sign in with Google</button>
        {error && <p className="error">{error}</p>}
        <p>
          {isSignUp ? (
            <>
              Already have an account?{' '}
              <span onClick={toggleForm} style={{ color: 'blue', cursor: 'pointer' }}>
                Log in
              </span>
            </>
          ) : (
            <>
              Don’t have an account yet?{' '}
              <span onClick={toggleForm} style={{ color: 'blue', cursor: 'pointer' }}>
                Sign up
              </span>
            </>
          )}
        </p>
      </div>
    </LoginStyle>
  )
}

export default LoginForm