import { useState } from 'react'

export default function App() {
  const [input, setInput] = useState("");
  const [tarefas, setTarefas] = useState< string[]>([])
  const [editarTarefa, setEditarTarefa] = useState({
    enabled: false,
    tarefa:''
  })
 
  function registrar(){
    if(!input){
      alert("Preencha o nome da sua tarefa")
      return;
    }

    if(editarTarefa.enabled){
      editarTarefaSalva();
      return
    }

    setTarefas(tarefas => [...tarefas, input])
    setInput("")
  }

  function editarTarefaSalva(){
    const findIndextarefa = tarefas.findIndex(tarefas => tarefas === editarTarefa.tarefa)
    const todasTarefas = [...tarefas];

    todasTarefas[findIndextarefa]=input;
    setTarefas(todasTarefas);
    setEditarTarefa({
      enabled: false,
      tarefa: ''
    })
      setInput("")
      
  }

  function excluir(item: string){
    const excluirTarefa = tarefas.filter(tarefas => tarefas !== item)
    console.log(excluirTarefa)
    setTarefas(excluirTarefa)
    alert(item)
  }
  function editar(item: string){
    setInput(item)
    setEditarTarefa({
      enabled: true,
      tarefa: item
    })
  }
  return (
    <>
      <div>
        <h1>Lista de tarefas</h1>
          <input
            placeholder="Digite uma tarefa..."
            value={input}
            onChange={ (e) => setInput(e.target.value)}
          />
          <button onClick={registrar}>{editarTarefa.enabled ? "Atualizar tarefa" : "Adicionar Tarefa"}</button>
          <hr/>

          {tarefas.map ( (item, index) =>(
            <section key={item}>
              <span>{item}</span>
              <button onClick={ () => excluir (item)}>Excluir</button>
              <button onClick={ () => editar(item)}>Editar</button>
            </section>

          ))}
      </div>
    </>
  )
}