import React, { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

export default function App() {
  const [user, setUser] = useState({ username: '', password: '' })
  const [logged, setLogged] = useState(false)

  async function login() {
    const { data } = await supabase
      .from('users_profile')
      .select('*')
      .eq('username', user.username)
      .single()

    if (data && data.password === user.password) {
      setLogged(true)
    } else {
      alert('بيانات غلط')
    }
  }

  if (!logged) {
    return (
      <div style={{ padding: 30 }}>
        <h2>تسجيل الدخول</h2>
        <input placeholder="يوزر" onChange={e => setUser({...user, username: e.target.value})} /><br/><br/>
        <input type="password" placeholder="باسورد" onChange={e => setUser({...user, password: e.target.value})} /><br/><br/>
        <button onClick={login}>دخول</button>
      </div>
    )
  }

  return <h2>تم الدخول بنجاح ✅ النظام شغال</h2>
}