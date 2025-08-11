import { db, auth } from 'src/firebase'
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore'

// Adiciona uma despesa para o usuário logado
export async function adicionarDespesa(dados) {
  const user = auth.currentUser
  if (!user) throw new Error('Usuário não autenticado')

  const ref = collection(db, 'despesas', user.uid, 'lista')
  await addDoc(ref, dados)
}

// Busca todas as despesas do usuário logado
export async function buscarDespesas() {
  const user = auth.currentUser
  if (!user) throw new Error('Usuário não autenticado')

  const ref = collection(db, 'despesas', user.uid, 'lista')
  const snapshot = await getDocs(ref)
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

// Excluir despesa por id
export async function deletarDespesa(id) {
  const user = auth.currentUser
  if (!user) throw new Error('Usuário não autenticado')

  const docRef = doc(db, 'despesas', user.uid, 'lista', id)
  await deleteDoc(docRef)
}
