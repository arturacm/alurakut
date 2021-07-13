import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import {AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet} from "../src/lib/AlurakutCommons"
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';
import React from "react" 

function ProfileSidebar(props){
return(
  <Box as= "aside" >
    <img src={`https://github.com/${props.githubUser}.png`} style={{borderRadius: "8px"}} />
    <hr/>
    <p>
      <a className="boxLink" href={`https://github.com/${props.githubUser}`}>
        @{props.githubUser}
      </a>
    </p>
    <hr/>
    <AlurakutProfileSidebarMenuDefault/>
  </Box>
)
}

export default function Home() {
  const usuario = "arturacm"
  const pessoasFavoritas = ["juunegreiros", "omariosouto", "peas", "filipedeschamps"]
  const [comunidades,setComunidades] = React.useState([{
    id: "12353245345234262423234",
    title: "Eu odeio Acordar cedo",
    image: `http://placehold.it/300x300`
    }])

  return (
    <>
  <AlurakutMenu githubUser="arturacm" />
  <MainGrid>
    <div className="profileArea" style={{gridArea:"profileArea"}}>
    <ProfileSidebar githubUser={usuario} />
    </div>
    <div className="welcomeArea" style={{gridArea:"welcomeArea"}}> 
      <Box>
        <h1 className= "title">
        Bem Vindo(a)
        </h1>
        <OrkutNostalgicIconSet fas={10} fotos={2} mensagens={99} recados={9} confiavel={3} legal={1} sexy={3} />
      </Box>

      <Box>
        <h2 className="subTitle">
          O que você deseja fazer?
        </h2>
        <form onSubmit={(e)=>{
          e.preventDefault()
          console.log(e)
          const formData = new FormData(e.target)
          console.log(formData.get("title"), formData.get("image"))
          const newComunidade = {
            id: new Date().toISOString(),
            title: formData.get("title"),
            image: formData.get("image")

          }
          const novasComunidades = [...comunidades,newComunidade]

          setComunidades(novasComunidades);
        }}>
          <div>
            <input 
            placeholder="qual vai ser o nome da sua comunidade?" 
            name="title" 
            aria-label="qual vai ser o nome da sua comunidade?"
            />
          </div>
          <div>
            <input 
            placeholder="Digite uma URL para usarmos de capa" 
            name="image" 
            aria-label="Digite uma URL para usarmos de capa"
            />
          </div>
          <button>
            Criar comunidade
          </button>
        </form>
      </Box>
    </div>
    <div className= "profileRelationsArea" style={{gridArea: "profileRelationsArea"}}>
      <ProfileRelationsBoxWrapper>
        <h2 className="smallTitle">
          Pessoas da Comunidade{pessoasFavoritas.length})
        </h2>
        <ul>
        {pessoasFavoritas.map((pessoa)=>{
          return(
           <li key={pessoa}>
           <a href= {`/users/${pessoa}`} >
              <img src={`https://github.com/${pessoa}.png`}/>
              <span>{pessoa}</span>
            </a>

           </li>
          )
        })}

        </ul>
      </ProfileRelationsBoxWrapper>
      <ProfileRelationsBoxWrapper>
        <h2 className="smallTitle">
          Comunidade({comunidades.length})
        </h2>
        <ul>
        {comunidades.map((comunidade)=>{
          return(
           <li key={comunidade.id}>
           <a href= {`/users/${comunidade.title}`} >
              <img src={comunidade.image}/>
              <span>{comunidade.title}</span>
            </a>

           </li>
          )
        })}

        </ul>
      </ProfileRelationsBoxWrapper>
    
    </div>
  </MainGrid>
  </>
  );
  }