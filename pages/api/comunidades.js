import {SiteClient} from "datocms-client"

export default async function recebedorDeRequests(req,res){
    if (req.method === 'POST'){

        const TOKEN = "a20526a7310573a12b90aaa6b01743"
        const client = new SiteClient(TOKEN)
    
        console.log("olha o terminal ai gente",TOKEN)
    
        const registroCriado = await client.items.create({
            itemType: "968044",
            ...req.body,
            // title: "comunidade de teste",
            // imageUrl: "https://github.com/arturacm.png",
            // creatorSlug: "arturacm"
        })
        
        console.log(registroCriado)
    
        res.json({
            dados:"teste de dados por aqui",
            resgistroCriado: registroCriado
        })
        return;
    }
    res.status(404).json({
        status:"chega aqui pelo get nao fi",
        
    })
}