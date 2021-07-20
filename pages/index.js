import MainGrid from '../src/components/MainGrid';
import nookies from 'nookies';
import jwt from "jsonwebtoken"
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
function ProfileRelationsBox(props){
  return (
    <ProfileRelationsBoxWrapper>
        <h2 className="smallTitle">
          {props.title}({props.items.length})
        </h2>
        <ul>
        { 
        props.items.map((pessoa,i)=>{
          
          if (i<6)return(
           <li key={pessoa.id}>
           <a href= {`/users/${pessoa.login}`} >
              <img src={pessoa.avatar_url}/>
              <span>{pessoa.login}</span>
            </a>

           </li>
          )
        })} 

        </ul>
      </ProfileRelationsBoxWrapper>
  )
}
export default function Home(props) {
  const usuario = props.githubUser;
  const pessoasFavoritas = ["juunegreiros", "omariosouto", "peas", "filipedeschamps","arturacm","arturacm","filipedeschamps"]
  
  const [seguidores, setSeguidores] = React.useState([]);

  React.useEffect(()=>{
    fetch(`https://api.github.com/users/${usuario}/following`)
    .then((res)=>res.ok?res.json():false)
    .then(fullRes=>{
      console.log(fullRes)
      setSeguidores(fullRes);
    })

    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': '525301761155a5b6a65da57a470287',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ "query": `query {
        allCommunities {
          id 
          title
          imageUrl
          creatorSlug
        }
      }` })
    })
    .then((response) => response.json()) // Pega o retorno do response.json() e já retorna
    .then((respostaCompleta) => {
      const comunidadesVindasDoDato = respostaCompleta.data.allCommunities;
      console.log(comunidadesVindasDoDato)
      setComunidades(comunidadesVindasDoDato)
    })







  },[])


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
          const comunidade = {
            title: formData.get("title"),
            imageUrl: formData.get("image"),
            creatorSlug: usuario

          }

          fetch(`/api/comunidades`,{
            method: 'POST',
            headers: {
              'Content-Type' : 'application/json'
              
            },
            body: JSON.stringify(comunidade)
          })
          .then(async(response)=>{
            const dados = await response.json();

            console.log(dados.registroCriado)

            const comunidadesAtualizadas = [comunidade,...comunidades ]
  
            setComunidades(comunidadesAtualizadas);
          })
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
      
      <ProfileRelationsBox title="Seguidores" items = {seguidores}/>
      
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
           <a href= {`/communities/${comunidade.id}`} >
              <img src={comunidade.imageUrl}/>
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

  export async function getServerSideProps(context) {
    const cookies = nookies.get(context)
    const token = cookies.USER_TOKEN;
    // console.log("cookies", )
    const { isAuthenticated } = await fetch("https://alurakut.vercel.app/api/auth",{
      headers: {
        Authorization: token
      }
    })
   .then((resposta)=>resposta.json())

   if(!isAuthenticated){
     return {
       redirect:{
         destination:'/login',
         permanent: false
       }
     }
   }

    const { githubUser } = jwt.decode(token)
    return {
      props: {
        githubUser
      },
    }

  }