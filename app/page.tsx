
'use client'
import {useState} from 'react' 
import {supabase} from '../lib/supabaseclient'

export default function Home() {
  const [task, setTask] =useState('')
  const [tasks, setTasks] =useState<string[]>([])
  
  function addTask (){
    setTasks([...tasks, task])
    setTask('')
  
  }

  return(
    <div style= {{ padding:40}}>
      <h1>Lista de tarefas</h1>
      <input 
      value={task}
      onChange={(e)=>setTask(e.target.value)}
      placeholder ="Digite uma tarefa"/>

      <button onClick={addTask}>Adicionar</button>
      <ul>
        {tasks.map((t, i)=>(
        <li key={i}>{t}</li>
        ))}
    </ul>
    </div>
  )

  //Salvar uma tarefa nova
  async function addTask () {
    await supabase
    .from('tasks')
    .insert({title: task})
    setTask('')
    loadTask()
  }

  //Busca por todas as tarefas
  async function loadTask () {
    const {data} = await supabase
    .from ('tasks')
    setTask(data ?? [])
  }

  //carregamento ao abrir a página
  useEffect (() => {
    loadTask()
  }, [])
}


