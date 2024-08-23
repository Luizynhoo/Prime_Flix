import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import './favoritos.css'

function Favoritos(){

    const [filmes, setFilmes] = useState([])

    useEffect(()=>{
        
        const minhalista = localStorage.getItem("@primeflix");
        setFilmes(JSON.parse(minhalista) || [])
    }, [])

    function excluirFilme(id){
        //Filtrando todos os filmes 
        let filtroFilmes = filmes.filter( (item) => {
            //Fazendo retornar todos os filmes menos o que eu cliquei
            return (item.id !== id)
        })

        setFilmes(filtroFilmes);
        //Limpando tbm do storage local
        localStorage.setItem("@primeflix", JSON.stringify(filtroFilmes))
        toast.success("Filme removido com sucesso !")
    }

    return(
        <div className='meus-filmes'>
            <h1>Meus filmes</h1>
            {/* Caso não tenha nenhum filme essa mensagem aparece */}
            {filmes.length === 0 && <span>Você não salvou nenhum filme ainda :(</span>}

            {/* Montando a lista de filmes */}
            <ul>
                {filmes.map((item)=>{
                    return(
                        <li key={item.id}>
                            <span>{item.title}</span>
                            <div>
                                <Link to={`/filme/${item.id}`}>Ver detalhes</Link>
                                {/* Passando a id do filme clicado junto com a função de excluir */}
                                <button onClick={() => excluirFilme(item.id)}>Excluir</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
};

export default Favoritos;