import { useState, useEffect } from "react";
import api from '../../services/api';
import { Link } from 'react-router-dom'
import './home.css'

//URL da API: https://api.themoviedb.org/3/movie/now_playing?api_key=00c9bf6c13cffdd6c6195156b60ed625&language=pt-BR

function Home() {
    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadFilmes() {
            const response = await api.get("movie/now_playing", {
                params: {
                    api_key: '00c9bf6c13cffdd6c6195156b60ed625',
                    language: 'pt-BR',
                    page: 2,
                }
            }) 
            setFilmes(response.data.results.slice(0, 20));
            setLoading(false);
        } 
        loadFilmes();
    }, []);


    if(loading) {
        return(
            <div className="loading">
                <h2>Carregando Filmes...</h2>
            </div>
        )
    }

    return(
        <>
            <div className="container">
               <div className="lista-filmes">
                    {filmes.map((filme) => {
                        return(
                            <article key={filme.id}>
                                <strong>{filme.title}</strong>
                                <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title} />
                                <Link to={`/filme/${filme.id}`}>Acessar</Link>
                            </article>
                        )
                    })}
               </div>
            </div>
        </>
    )
}

export default Home;