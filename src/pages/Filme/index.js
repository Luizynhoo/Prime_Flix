import { useEffect, useState } from "react";
import { useParams, useNavigate, Link, json} from "react-router-dom";
import { toast } from 'react-toastify'

import api from "../../services/api";

import "./filmes.css";

function Filme() {
  //Buscando o componente id
  const { id } = useParams();
  const navigation = useNavigate()
  const [filme, setFilme] = useState({});
  const [loading, setLoading] = useState(true);

  //Mesma intenção na utilização no Home
  useEffect(() => {
    async function loadFilme() {
      await api.get(`/movie/${id}`, {
          params: {
            api_key: "047ecea442f859b2999a63a9fa133b0e",
            language: "pt-BR",
          },
        })
        //Se o usuario procurar um filme por uma id inexistente volta para o menu
        .then((response) => {
          setFilme(response.data);
          setLoading(false);
        })
        .catch(() => {
          console.log("Filme não encontrado");
          //Usando o navigate para voltar para pagina principal
          //Usando o replace para assim que voltar limpar o histórico
          //Fazendo com que o usúario não volte para a página errada
          navigation("/",{ replace:true })
          return;
        })
    }

    loadFilme();

    return () => {
      console.log("COMPONENTE FOI DESMONTADO")
    }
  }, [navigation, id])

  //Função para salvar os filmes 
  function salvarFilme(){
    const minhalista = localStorage.getItem("@primeflix");
    //Buscando alguma coisa na lista se tiver é salvo no let, caso contrário é salvo em uma váriavel vazia
    let filmesSalvos = JSON.parse(minhalista) || [];
    //Verificando se tem algum filme igual ao que vc quer salvar na lista 
    //Caso tenha ele retorna true e ativa o alert
    const hasFilme = filmesSalvos.some( (filmesSalvo) => filmesSalvo.id === filme.id)
    if(hasFilme){
      toast.warn("Esse filme já foi salvo na lista!")
      return;
    }
    //Fazendo o salvamento do filme
    filmesSalvos.push(filme);
    localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos))
    toast.success("Filme salvo com sucesso!")

  }


  //Criando um loading para entrar nos detalhes
  if (loading) {
    return (
      <div className="filme-info">
        <h1>Carregando detalhes...</h1>
      </div>
    )
  }

  return (
    <div className="filme-info">
        <h1>{filme.title}</h1>
        <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />

        <h3>Sinopse</h3>
        <span>{filme.overview}</span>
        <strong>Avaliação : {filme.vote_average}/10</strong>

        <div className="area-btn">
          <button onClick={salvarFilme}>Salvar</button>
          <button>
            {/* Abrindo o trailer do filme  */}
            <Link target="_blank" to={`https://youtube.com/results?search_query=${filme.title} trailer`}>Trailer</Link>
          </button>
        </div>
    </div>
  );
}

export default Filme;
