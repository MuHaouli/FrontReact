import { Link } from 'react-router-dom'

type GameHolderProps = {
  title: string
  description?: string
  imageUrl?: string
  gameUrl: string
}

function GameHolder({
  title,
  description = 'Clique para acessar o jogo',
  imageUrl,
  gameUrl,
}: GameHolderProps) {
  return (
    <article className="gameCard">
      <Link to={gameUrl} className="gameCardLink">
        <div className="gameCardImage">
          {imageUrl ? (
            <img src={imageUrl} alt={title} />
          ) : (
            <div className="gameCardPlaceholder">Imagem do jogo</div>
          )}
        </div>
        <div className="gameCardContent">
          <h2>{title}</h2>
          <p>{description}</p>
          <span className="">Ver jogo</span>
        </div>
      </Link>
    </article>
  )
}

export default GameHolder;