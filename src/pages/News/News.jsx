import React, { useEffect, useState } from 'react';
import styles from './News.module.css';

const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const NEWS_API_URL = 'https://newsapi.org/v2/everything';
const ARTICLES_PER_PAGE = 3;
const PLACEHOLDER_IMAGE = 'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?q=80&w=1200&auto=format&fit=crop';

const News = () => {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState('loading');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    const loadMathNews = async () => {
      try {
        if (!NEWS_API_KEY) {
          throw new Error('Configura VITE_NEWS_API_KEY en el archivo .env.');
        }

        const params = new URLSearchParams({
          q: 'mathematics OR math OR algebra OR geometry',
          language: 'en',
          sortBy: 'publishedAt',
          pageSize: '12',
          apiKey: NEWS_API_KEY,
        });

        const response = await fetch(`${NEWS_API_URL}?${params.toString()}`, {
          signal: controller.signal,
        });
        const data = await response.json();

        if (!response.ok || data.status !== 'ok') {
          throw new Error(data.message || 'No se pudieron cargar las noticias.');
        }

        const visibleArticles = data.articles
          .filter((article) => article.title && article.title !== '[Removed]')
          .map((article) => ({
            ...article,
            publishedAtFormatted: new Intl.DateTimeFormat('es-EC', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            }).format(new Date(article.publishedAt)),
          }));

        setArticles(visibleArticles);
        setCurrentPage(1);
        setStatus('success');
      } catch (error) {
        if (error.name === 'AbortError') return;
        setErrorMessage(error.message);
        setStatus('error');
      }
    };

    loadMathNews();

    return () => controller.abort();
  }, []);

  const totalPages = Math.ceil(articles.length / ARTICLES_PER_PAGE);
  const firstArticleIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
  const visibleArticles = articles.slice(firstArticleIndex, firstArticleIndex + ARTICLES_PER_PAGE);

  const goToPreviousPage = () => {
    setCurrentPage((page) => Math.max(page - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((page) => Math.min(page + 1, totalPages));
  };

  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <span className={styles.eyebrow}>Matemáticas en el mundo</span>
        <h1>Noticias Matemáticas</h1>
        <p>
          Descubre novedades, investigaciones y avances recientes sobre números,
          modelos, álgebra, geometría y ciencia de datos.
        </p>
      </section>

      {status === 'loading' && (
        <div className={styles.grid} aria-label="Cargando noticias">
          {Array.from({ length: ARTICLES_PER_PAGE }).map((_, index) => (
            <article className={`${styles.card} ${styles.skeleton}`} key={index}>
              <div className={styles.skeletonImage} />
              <div className={styles.cardBody}>
                <div className={styles.skeletonLine} />
                <div className={styles.skeletonTitle} />
                <div className={styles.skeletonText} />
              </div>
            </article>
          ))}
        </div>
      )}

      {status === 'error' && (
        <div className={styles.message} role="alert">
          <h2>No se pudieron cargar las noticias</h2>
          <p>{errorMessage}</p>
        </div>
      )}

      {status === 'success' && (
        <>
          <section className={styles.grid} aria-label="Noticias matemáticas recientes">
            {visibleArticles.map((article) => (
              <article className={styles.card} key={`${article.url}-${article.publishedAt}`}>
                <a href={article.url} target="_blank" rel="noreferrer" className={styles.imageLink}>
                  <img
                    src={article.urlToImage || PLACEHOLDER_IMAGE}
                    alt={article.title}
                    className={styles.image}
                    loading="lazy"
                  />
                </a>
                <div className={styles.cardBody}>
                  <div className={styles.meta}>
                    <span>{article.source?.name || 'NewsAPI'}</span>
                    <span>{article.publishedAtFormatted}</span>
                  </div>
                  <h2>{article.title}</h2>
                  <p>{article.description || 'Lee la noticia completa para conocer más detalles.'}</p>
                  <a href={article.url} target="_blank" rel="noreferrer" className={styles.readMore}>
                    Leer noticia
                  </a>
                </div>
              </article>
            ))}
          </section>

          {totalPages > 1 && (
            <nav className={styles.pagination} aria-label="Paginación de noticias">
              <button type="button" onClick={goToPreviousPage} disabled={currentPage === 1}>
                Anterior
              </button>
              <span>
                Página {currentPage} de {totalPages}
              </span>
              <button type="button" onClick={goToNextPage} disabled={currentPage === totalPages}>
                Siguiente
              </button>
            </nav>
          )}
        </>
      )}
    </div>
  );
};

export default News;
