
'use client'

import {useState, useEffect} from 'react' 
import { supabase } from '@/lib/supabaseclient'

export default function Home() {
  const [task, setTask] =useState('')
  const [tasks, setTasks] =useState<string[]>([])
  
  
  function addTask (){
    setTasks([...tasks, task])
    setTask('')
  
  }

  //salvar tarefa
  async function addTaskD() {
    await supabase
    .from('tasks')
    .insert({title: task})
    setTask('')
    loadTasks()
    
  }

  //busca por todas as tarefas
  async function loadTasks() {
    const {data} =  await supabase
    .from ('tasks')
    .select('*')
    setTasks(data ?? [])
  }
  
  //carregar ao abrir a pagina
  useEffect(() => {loadTasks()}, [])

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

  
}


