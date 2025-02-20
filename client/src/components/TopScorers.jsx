import "../styles/TopScorers.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TopScorers = () => {
  const [competition, setCompetition] = useState('PL'); // Default competition is Premier League
  const [scorers, setScorers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Competition options
  const competitions = {
    PL: 'Premier League',
    SA: 'Serie A',
    PD: 'La Liga',
    BL1: 'Bundesliga',
    FL1: 'Ligue 1',
  };

  // Fetch top scorers for the selected competition
  useEffect(() => {
    const fetchTopScorers = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/${competition}/scorers`);
        setScorers(response.data);
      } catch (error) {
        setError('Error fetching top scorers data.');
        console.error(`Error fetching top scorers for ${competition}:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopScorers();
  }, [competition]);

  // Handle competition change from dropdown
  const handleCompetitionChange = (event) => {
    setCompetition(event.target.value);
  };

  return (
    <div className="top-scorers-container">
      <h2 className="title">Top Scorers in {competition}</h2>

      {/* Competition dropdown */}
      <select className="competition-select" onChange={handleCompetitionChange} value={competition}>
        {Object.keys(competitions).map((key) => (
          <option key={key} value={key}>
            {competitions[key]}
          </option>
        ))}
      </select>

      {loading && <p className="loading-text">Loading top scorers...</p>}

      {error && <p className="error-text">{error}</p>}

      {scorers.length === 0 ? (
        <p className="no-scorers-text">No top scorers available</p>
      ) : (
        <ul className="scorers-list">
          {scorers.map((scorer, index) => (
            <li key={index} className="scorer-item">
              <div className="scorer-header">
                <img src={scorer.team.crest} alt="" className="team-crest" />
                <div className="player-info">
                  <strong className="player-name">{scorer.player.name}</strong>
                  <span className="team-name">({scorer.team.name})</span>
                </div>
              </div>

              <div className="stats">
                <ul className="stats-list">
                  <li>Matches: {scorer.playedMatches}</li>
                  <li>Goals: {scorer.goals}</li>
                  <li>Assists: {scorer.assists}</li>
                  <li>Penalties: {scorer.penalties}</li>
                </ul>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TopScorers;
