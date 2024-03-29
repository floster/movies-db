import { BtnShowMoreAttributes } from '../../types/tmdb.models'

const BtnShowMore: React.FC<BtnShowMoreAttributes> = ({
  currentPage,
  pagesQty,
  handleShowMore,
}) => {
  const isHidden = currentPage >= pagesQty

  return (
    <button
      className={`button m-block m-show_more ${isHidden ? 'm-hidden' : ''}`}
      onClick={() => handleShowMore()}
      disabled={isHidden}>
      need more ({currentPage} / {pagesQty})
    </button>
  )
}

export default BtnShowMore
