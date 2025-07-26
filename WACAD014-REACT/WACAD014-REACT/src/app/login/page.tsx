'use client'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const router = useRouter()

  const handleLogin = (data: any) => {
    router.push('/')
  }

  return (
    <main className="container mt-5">
      <h2>Entrar</h2>
      <form onSubmit={handleSubmit(handleLogin)}>
        <div className="mb-3">
          <label>Email</label>
          <input {...register('email', { required: 'Informe o email' })} className="form-control" />
          {errors.email && <span className="text-danger">{errors.email.message}</span>}
        </div>
        <div className="mb-3">
          <label>Senha</label>
          <input type="password" {...register('senha', { required: 'Senha obrigatória', minLength: { value: 6, message: 'Mínimo 6 caracteres' } })} className="form-control" />
          {errors.senha && <span className="text-danger">{errors.senha.message}</span>}
        </div>
        <button className="btn btn-success">Acessar</button>
      </form>
    </main>
  )
}