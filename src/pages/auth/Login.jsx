import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { loginSchema } from '../../utils/validators'
import FormInput from '../../components/form/FormInput'
import useAuthStore from '../../store/auth.store'
import { useNavigate } from 'react-router'
import { useState } from 'react'
import axios from '../../configs/axios'

function Login() {
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.actionLoginWithZustand)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(loginSchema)
  })
  const [error, setError] = useState(null)

  const onSubmit = async (formData) => {
    setError(null)
    const result = await login(formData)
    console.log('Login result:', result)

    if (result.success) {
      if (result.role === 'ADMIN') {
        navigate('/admin')
      } else {
        navigate('/dashboard')
      }
    } else {
      alert(result.message || 'Login failed')
    }
  }

  const test = async () => {
    try {
      const res = await axios.get('auth/testToken')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-blue-600">Login</h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <FormInput
          label="Email"
          name="email"
          type="email"
          register={register}
          error={errors.email?.message}
        />

        <FormInput
          label="Password"
          name="password"
          type="password"
          register={register}
          error={errors.password?.message}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <button 
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
      onClick={test}>test
      </button>
    </div>
  )
}

export default Login
