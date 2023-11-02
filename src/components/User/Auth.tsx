import { useState } from 'react'

import { supabase } from '../../supabase/client'
import { AuthError } from '@supabase/supabase-js'
import Spinner from '../UI/Spinner'

const Auth = () => {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setLoading(true)
    const { error }: { error: AuthError | null } =
      await supabase.auth.signInWithOtp({ email })

    if (error) {
      alert(error.message)
    } else {
      alert('Check your email for the login link!')
    }
    setLoading(false)
  }
  return (
    <div className="auth">
      <h1 className="auth__header">Supabase Auth</h1>
      <p className="auth__description">
        Sign in via magic link with your email below
      </p>
      <form className="auth__form app-form" onSubmit={handleLogin}>
        <input
          className="app-input m-center"
          type="email"
          placeholder="Your email"
          value={email}
          required={true}
          onChange={e => setEmail(e.target.value)}
        />
        <button className="button m-primary m-block" disabled={loading}>
          {loading ? <Spinner /> : <span>Send magic link</span>}
        </button>
      </form>
    </div>
  )
}

export default Auth
