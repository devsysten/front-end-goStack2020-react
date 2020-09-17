import React, {useState, useEffect} from 'react';
import api from './services/api';
import Header from './components/Header';
import './App.css';
import backgroundImage from './assets/background.jpg';

function App(){
  const [projects, setProjects] = useState([]);

  useEffect(()=>{
    api.get('/projects').then(response=>{
      setProjects(response.data);
    })
  },[]);

  async function handleAddProject(){
    //projects.push(`Novo Projeto ${Date.now()}`);
    //setProjects([...projects,`Novo Projeto ${Date.now()}`])
    const response = await api.post('projects',{
      title:`Novo Projeto ${Date.now()}`,
	    owner:"Esdras Santos"
    });
    const project = response.data;
    setProjects([...projects, project]);
  }
  return (
  <>
  <Header title="Projects" />
  <img width={400} src={backgroundImage}/>
  <ul>
  {projects.map(project => <li key={project.id}>{project.title}</li>)}
  </ul>

  <button type='button' onClick={handleAddProject}>Adicionar Projeto</button>
  </>
)}
export default App;