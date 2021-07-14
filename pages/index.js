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
  const pessoasFavoritas = ["juunegreiros", "omariosouto", "peas", "filipedeschamps","arturacm","arturacm","filipedeschamps"]
  const [comunidades,setComunidades] = React.useState([{
    id: "12353245345234262423234",
    title: "Eu odeio Acordar cedo",
    image: `https://img10.orkut.br.com/community/52cc4290facd7fa700b897d8a1dc80aa.jpg`
  },{
    id: "2w123123121521341",
    title: "Discografias",
    image: "https://img10.orkut.br.com/community/f50f08c3f0acf3519578cbc92f81089c.jpg"
  },{
    id: "2w12312312152134143",
    title: "Lenin, de três",
    image: "https://img10.orkut.br.com/community/f0131f9cec84100d3b7e02bd8a9323c2.jpg"
  },{
    id: "2w1231231215213414343",
    title: "Foda é meu pai. Eu sou Fodinha",
    image: "https://img10.orkut.br.com/community/7b37fa056937aeeb0ff8b9d6d55c349f.jpg"
  },{
    id: "2w123123121521341434123",
    title: "Eu furo o olho da Gina do Palito",
    image: "http://3.bp.blogspot.com/-hWsDULghGBI/T0Dm-elYHKI/AAAAAAAACNs/L-6mjVp7_s4/s1600/GRD_770_palito+gina.jpg"
  },{
    id: "2w1231231215213414q34123",
    title: "Um Mamão Vai na Cabeça",
    image: "https://img10.orkut.br.com/community/182ed03574e9671d021058ba7e148cc5.jpg"
  },{
    id: "2w12312231215213414q34123",
    title: "Brasil Ragnarok Online",
    image: "https://img10.orkut.br.com/community/dafbf0f0e6d7c7311b24a0c41182472f.png"
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
          const novasComunidades = [newComunidade,...comunidades ]

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
          Pessoas da Comunidade({pessoasFavoritas.length})
        </h2>
        <ul>
        {pessoasFavoritas.map((pessoa,i)=>{
          
          if (i<6)return(
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
        {comunidades.map((comunidade, i)=>{
          if(i<6) return(
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