import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/UpcomingMatches.css'; // Import the new CSS for styling

const UpcomingMatches = () => {
  const [selectedLeague, setSelectedLeague] = useState('PL'); // Default league code
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);

  // Available leagues
  const leagues = [
    { code: 'PL', name: 'Premier League' },
    { code: 'SA', name: 'Serie A' },
    { code: 'LA', name: 'La Liga' },
    { code: 'BL1', name: 'Bundesliga' },
    { code: 'L1', name: 'Ligue 1' }
  ];

  useEffect(() => {
    const fetchUpcomingMatches = async () => {
      if (!selectedLeague) return;

      setLoading(true);

      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/competitions/${selectedLeague}/upcoming`);
        setMatches(response.data);
      } catch (error) {
        console.error('Error fetching upcoming matches:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingMatches();
  }, [selectedLeague]);

  const handleLeagueClick = (leagueCode) => {
    setSelectedLeague(leagueCode);
  };

  return (
    <div className="upcoming-matches-container">
      <h2 className="title">Upcoming Matches</h2>
      
      {/* League Buttons */}
      <div className="league-buttons">
        {leagues.map((league) => (
          <button
            key={league.code}
            className={`league-btn ${selectedLeague === league.code ? 'selected' : ''}`}
            onClick={() => handleLeagueClick(league.code)}
          >
            {league.name}
          </button>
        ))}
      </div>

      {/* Matches List */}
      {loading ? (
        <p className="loading-text">Loading upcoming matches...</p>
      ) : (
        <ul className="matches-list">
          {matches.length === 0 ? (
            <p className="no-matches">No upcoming matches for the selected league.</p>
          ) : (
            matches.map((match, index) => (
              <li key={index} className="match-item">
                <div className="match-details">
                  {/* Home Team */}
                  <div className="team home-team">
                    <img 
                      src={match.homeTeam.crest} 
                      alt={match.homeTeam.name} 
                      className="team-crest" 
                    />
                    {match.homeTeam.shortName}
                  </div>

                  {/* VS Divider */}
                  <div className="vs-container">
                    <div className="match-date">
                    {new Date(match.utcDate).toLocaleDateString([], { year: '2-digit', month: '2-digit', day: '2-digit' })}
                    </div>
                    <div className="vs">VS</div>
                    <div className="match-time">
                    {new Date(match.utcDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>

                  {/* Away Team */}
                  <div className="team away-team">
                    {match.awayTeam.shortName}
                    <img 
                      src={match.awayTeam.crest} 
                      alt={match.awayTeam.name} 
                      className="team-crest" 
                    />
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default UpcomingMatches;
