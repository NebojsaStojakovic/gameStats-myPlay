import { LayoutGroup, motion } from "framer-motion";

const Table = ({
  playersStats,
  teamData,
  currentIndex,
  setCurrentIndex,
  setDirection,
}) => {
  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
    if (slideIndex > currentIndex) {
      setDirection(1);
    } else {
      setDirection(-1);
    }
  };
  return (
    <LayoutGroup id='fullSlider'>
      <div className='table__container'>
        <table className='table'>
          <thead className='table__header'>
            <tr>
              <td></td>
              <td>Pts</td>
              <td>FT</td>
              <td>FG</td>
              <td>3PTS</td>
              <td>AST</td>
              <td>O/R</td>
              <td>D/R</td>
              <td>T/O</td>
              <td>STL</td>
              <td>BS</td>
            </tr>
          </thead>
          <tbody>
            <tr className='table__team' onClick={() => goToSlide(0)}>
              <td className='table__team-name'>
                <div className='table__player-number hidden'></div>

                <img src={teamData.logo} alt={teamData.name} />
                {teamData.name}
              </td>
              <td>73</td>
              <td>73</td>
              <td>73</td>
              <td>73</td>
              <td>73</td>
              <td>73</td>
              <td>73</td>
              <td>73</td>
              <td>73</td>
              <td>73</td>
              {currentIndex === 0 && (
                <motion.td className='highlight' layoutId='highlight' />
              )}
            </tr>

            {playersStats?.map((player, sliderIndex) => {
              return (
                <tr
                  className='table__player'
                  key={sliderIndex + 1}
                  onClick={() => goToSlide(sliderIndex + 1)}
                >
                  <td className='table__player-name'>
                    {player.number ? (
                      <div className='table__player-number'>
                        <span>{player.number && player.number}</span>
                      </div>
                    ) : (
                      <div className='table__player-number hidden'></div>
                    )}

                    {player.avatar ? (
                      <img src={player.avatar} alt={player.id} />
                    ) : (
                      <div className='table__player-image'>
                        <span>
                          {player.firstName.charAt(0) +
                            player.lastName.charAt(0)}
                        </span>
                      </div>
                    )}

                    {player.firstName + " " + player.lastName}
                  </td>
                  <td>
                    {player.stats.FT + player.stats.FG + player.stats["3 PTS"]}
                  </td>
                  <td>{player.stats.FT}</td>
                  <td>{player.stats.FG}</td>
                  <td>{player.stats["3 PTS"]}</td>
                  <td>{player.stats.AST}</td>
                  <td>{player.stats["O/R"]}</td>
                  <td>{player.stats["D/R"]}</td>
                  <td>{player.stats["T/O"]}</td>
                  <td>{player.stats.STL}</td>
                  <td>{player.stats.BS}</td>
                  {sliderIndex + 1 === currentIndex && (
                    <motion.td className='highlight' layoutId='highlight' />
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </LayoutGroup>
  );
};

export default Table;
