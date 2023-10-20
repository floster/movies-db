import { ShowMoreBtnAttributes } from '../../types/tmdb.models'

const ShowMoreBtn: React.FC<ShowMoreBtnAttributes> = ({
  currentPage,
  pagesQty,
  handleShowMore,
}) => {
  const isHidden = currentPage >= pagesQty

  // TODO: #wantall add 'want all' button
  return (
    <button
      className={`app-button ${isHidden && 'm-hidden'}`}
      onClick={() => handleShowMore()}
      disabled={isHidden}>
      need more ({currentPage} / {pagesQty})
    </button>
  )
}

export default ShowMoreBtn
