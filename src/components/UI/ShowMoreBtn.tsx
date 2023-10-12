interface ShowMoreBtnProps {
  handleShowMore: () => void;
  currentPage: number;
  pagesQty: number;
}

export const ShowMoreBtn: React.FC<ShowMoreBtnProps> = ({
  currentPage,
  pagesQty,
  handleShowMore,
}) => {
  const isHidden = currentPage >= pagesQty;

  return (
    <button
      className={`app-button ${isHidden && "m-hidden"}`}
      onClick={() => handleShowMore()}
      disabled={isHidden}
    >
      need more ({currentPage} / {pagesQty})
    </button>
  );
};
