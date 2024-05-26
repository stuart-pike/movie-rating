export function WatchedList({ watched, onDeleteWatched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedListCard
          watchedMovie={movie}
          key={movie.imdbID}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  );
}

function WatchedListCard({ watchedMovie, onDeleteWatched }) {
  const { poster, title, imdbRating, imdbID, userRating, runtime } =
    watchedMovie;
  return (
    <li>
      <img src={poster} alt={`${title} poster`} />
      <h3>{title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{runtime} min</span>
        </p>
        <button className="btn-delete" onClick={() => onDeleteWatched(imdbID)}>
          ✖
        </button>
      </div>
    </li>
  );
}
