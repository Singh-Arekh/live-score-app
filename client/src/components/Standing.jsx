import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/Standings.css";

const Standings = () => {
  const [league, setLeague] = useState('PL'); // Default league: Premier League
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // League options
  const leagues = {
    PL: 'Premier League',
    SA: 'Serie A',
    PD: 'La Liga',
    BL1: 'Bundesliga',
    FL1: 'Ligue 1',
  };

  // Fetch standings for the selected league
  useEffect(() => {
    const fetchStandings = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get(`http://localhost:3000/competitions/${league}/standings`);
        console.log('API Response:', response.data[0].table); // Log the entire response to inspect

        // Ensure standings and table are available before accessing
        if (response.data && response.data[0]) {
          const standingsData = response.data[0].table;
          setStandings(standingsData);
        } else {
          setError('No standings data available for this league.');
        }

        if (response.data.standings && response.data.standings[0] && response.data.standings[0].table.length === 0) {
          setError('No teams in the standings for this league.');
        }
      } catch (error) {
        setError('Error fetching standings data.');
        console.error(`Error fetching standings for ${league}:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchStandings();
  }, [league]);

  // Handle league change from dropdown
  const handleLeagueChange = (event) => {
    setLeague(event.target.value);
  };

  return (
    <div className="standings-container">
      <h2 className="title">League Standings</h2>

      {/* League dropdown */}
      <select className="league-select" onChange={handleLeagueChange} value={league}>
        {Object.keys(leagues).map((key) => (
          <option key={key} value={key}>
            {leagues[key]}
          </option>
        ))}
      </select>

      {loading && <p className="loading-text">Loading standings...</p>}

      {error && <p className="error-text">{error}</p>}

      {standings.length === 0 ? (
        <p className="no-standings-text">No standings available</p>
      ) : (
        <table className="standings-table">
          <thead>
            <tr>
              <th>Position</th>
              <th>Team</th>
              <th>Played</th>
              <th>Won</th>
              <th>Lost</th>
              <th>Drawn</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((team, index) => (
              <tr key={index}>
                <td>{team.position}</td>
                <td>{team.team.name}</td>
                <td>{team.playedGames}</td>
                <td>{team.won}</td>
                <td>{team.lost}</td>
                <td>{team.draw}</td>
                <td>{team.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Standings;
