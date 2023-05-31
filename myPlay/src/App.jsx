import { useState } from "react";
import "./App.css";
import { useQuery } from "react-query";
import Slider from "./components/Slider";
import Table from "./components/Table";
// import { useGetStats } from "./hooks/useGetStats";
import { getStats } from "./api/getStats";

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const [playersStats, setPlayersStats] = useState();
  const [teamData, setTeamData] = useState();
  const [allTeam, setAllTeam] = useState();
  // const { data: dataAllStats } = useGetStats("", {
  //   // onSuccess: (data) => {
  //   //   setPlayersStats(data?.data);
  //   // },
  // });

  const { data: dataAllStats, isLoading } = useQuery(
    ["stats"],
    () => getStats(),
    {
      onSuccess: (data) => {
        setPlayersStats(data?.data.playersStats);
        setTeamData(data?.data.teamData);
        setAllTeam([data?.data.teamData, ...data?.data.playersStats]);
      },
    }
  );

  if (isLoading) return <div>Loading...</div>;
  return (
    <div className='container'>
      <section className='sectionone'>
        <div className='sectionone__left'>
          <div className='sectionone__container sectionone__donuts'>
            <h2>Donuts placeholder</h2>
          </div>
          <div className='sectionone__container sectionone__court'>
            <h2>Court placeholder</h2>
          </div>
        </div>
        <div className='sectionone__right'>
          <div className='sectionone__container sectionone__score'>
            <h2>Score placeholder</h2>
          </div>
          <Slider
            allTeam={allTeam}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            direction={direction}
            setDirection={setDirection}
          />
        </div>
      </section>

      <section className='sectiontwo'>
        <div className='sectionone__container sectiontwo__bars'>
          <h1>Bars placeholder</h1>
        </div>
      </section>

      <section className='sectionthree'>
        <div className='sectionone__container sectiontwo__table'>
          <Table
            playersStats={playersStats}
            teamData={teamData}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            direction={direction}
            setDirection={setDirection}
          />{" "}
        </div>
      </section>
    </div>
  );
};

export default App;
