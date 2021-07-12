import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import {AlurakutMenu, OrkutNostalgicIconSet} from "../src/lib/AlurakutCommons"
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

function ProfileSidebar(props){
return(
  <Box >
    <img src={`https://github.com/${props.githubUser}.png`} style={{borderRadius: "8px"}} />
  </Box>
)
}

export default function Home() {
  const usuario = "arturacm"
  const pessoasFavoritas = ["juunegreiros", "omariosouto", "peas", "filipedeschamps"]
  return (
    <>
  <AlurakutMenu/>
  <MainGrid>
    <div className="profileArea" style={{gridArea:"profileArea"}}>
    <ProfileSidebar githubUser={usuario} />
    </div>
    <div className="welcomeArea" style={{gridArea:"welcomeArea"}}> 
      <Box>
        <h1>
        Bem Vindo(a)
        </h1>
        <OrkutNostalgicIconSet/>
      </Box>
    </div>
    <div className= "profileRelationsArea" style={{gridArea: "profileRelationsArea"}}>
      <ProfileRelationsBoxWrapper>
        <h2 className="smallTitle">
          Pessoas da comunidade({pessoasFavoritas.length})
        </h2>
        <ul>
        {pessoasFavoritas.map((pessoa)=>{
          return(
           <li>
           <a href= {`/users/${pessoa}`} key={pessoa}>
              <img src={`https://github.com/${pessoa}.png`}/>
              <span>{pessoa}</span>
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