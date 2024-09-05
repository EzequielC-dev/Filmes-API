import { useState, useEffect } from "react";
import { useParams, useNavigate  } from "react-router-dom";
import api from '../../services/api';
import './filme.css';

function Filme() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadFilme() {
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: '00c9bf6c13cffdd6c6195156b60ed625',
                    language: 'pt-BR',
                }
            })
            .then((response) => {
                setFilme(response.data);
                setLoading(false);
            })
            .catch(() => {
                console.log('Não encontrado');
                navigate("/", { replace: true });
                return;
            })
        } 
        loadFilme();

        
        return(() => {
            console.log('Componente foi desmontado')
        });

    }, [navigate, id]);

    function salvarFilme() {
        const minhaLista = localStorage.getItem("@primeFlix");
        let filmesSalvos = JSON.parse(minhaLista) || [];
        const hasFilme = filmesSalvos.some((filmeSalvo) => {
            filmeSalvo.id === filme.id;
        });
        if(hasFilme) {
            alert("Esse filme já está na lista");
            return;
        } else {
            filmesSalvos.push(filme);
            localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
            alert("Filme salvo com sucesso");
        }
    }

    if(loading) {
        return(
            <div className="loading">
                <h2>Carregando Detalhes...</h2>
            </div>
        )
    }

    return(
            <div className="filmes-info">
                    <h1>{filme.title}</h1>
                    <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path} alt=${filme.title}"`}/>

                    <h3>Sinopse</h3>
                    <span>{filme.overview}</span>

                    <strong>Avaliação: {filme.vote_average ? filme.vote_average.toFixed(1) : "N/A"}/10</strong>
            
                    <div className="area-button">
                        <button onClick={salvarFilme}>Salvar</button>
                        <button><a target="blank" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>Trailer</a></button>
                    </div>
            </div>
    )
}

export default Filme;