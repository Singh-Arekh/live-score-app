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
    CL: 'Champions League',
    EL: 'Europa League',
  };

  // Fetch top scorers for the selected competition
  useEffect(() => {
    const fetchTopScorers = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/competitions/${competition}/scorers`);
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

  // Handle competition change when a league button is clicked
  const handleCompetitionChange = (selectedCompetition) => {
    setCompetition(selectedCompetition);
  };

  return (
    <div className="top-scorers-container">
      <h2 className="title">Top Scorers in {competitions[competition]}</h2>

      {/* Display all competition buttons */}
      <div className="competitions-buttons">
        {Object.keys(competitions).map((key) => (
          <button
            key={key}
            className={`competition-button ${competition === key ? 'active' : ''}`}
            onClick={() => handleCompetitionChange(key)}
          >
            {competitions[key]}
          </button>
        ))}
      </div>

      {loading && <p className="loading-text">Loading top scorers...</p>}

      {error && <p className="error-text">{error}</p>}

      {scorers.length === 0 ? (
        <p className="no-scorers-text">No top scorers available</p>
      ) : (
        <ul className="scorers-list">
          {scorers.map((scorer, index) => (
            <li key={index} className="scorer-item">
              <div className="scorer-row">
                <div className="team-logo">
                  <img src={scorer.team.crest} alt="" className="team-crest" />
                </div>
                <div className="player-info">
                  <strong className="player-name">{scorer.player.name}</strong>
                  <span className="team-name">({scorer.team.name})</span>
                </div>
                <div className="stats">
                  <div className="stat-column">
                    <span className="stat-title">Matches</span>
                    <span className="stat-value">{scorer.playedMatches}</span>
                  </div>
                  <div className="stat-column">
                    <span className="stat-title">Goals</span>
                    <span className="stat-value">{scorer.goals}</span>
                  </div>
                  <div className="stat-column">
                    <span className="stat-title">Assists</span>
                    <span className="stat-value">{scorer.assists}</span>
                  </div>
                  <div className="stat-column">
                    <span className="stat-title">Penalties</span>
                    <span className="stat-value">{scorer.penalties}</span>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TopScorers;
