import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '../../supabase/client'

const Login = () => (
  <Auth
    magicLink={false}
    onlyThirdPartyProviders={true}
    supabaseClient={supabase}
    providers={['google', 'github']}
    appearance={{ theme: ThemeSupa }}
  />
)

export default Login
