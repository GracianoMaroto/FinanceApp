import { auth } from '../firebase'
import { signOut } from 'firebase/auth'

export async function logout() {
  try {
    await signOut(auth)
    console.log('Usuário deslogado com sucesso.')
  } catch (error) {
    console.error('Erro ao deslogar:', error)
  }
}