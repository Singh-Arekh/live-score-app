import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/TodaysMatches.css'; // Import CSS for styling

const TodayMatches = () => {
  const [matches, setMatches] = useState({});
  const [loading, setLoading] = useState(true);

  // List of the competition codes for the top 5 leagues and Champions League
  const topCompetitions = ['PL', 'SA', 'LA', 'BL1', 'L1', 'CL','CLI'];

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get('${import.meta.env.VITE_REACT_APP_BACKEND_URL}/live');
        const allMatches = response.data; // Data is grouped by competition

        // Filter matches to only include the top leagues and Champions League
        const filteredMatches = {};
        Object.keys(allMatches).forEach((competitionCode) => {
          if (topCompetitions.includes(competitionCode)) {
            filteredMatches[competitionCode] = allMatches[competitionCode];
          }
        });

        setMatches(filteredMatches); // Set the filtered matches
      } catch (error) {
        console.error('Error fetching today\'s matches', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="matches-container">
      <h2 className="matches-title">Today's Matches</h2>
      {Object.keys(matches).length === 0 ? (
        <p className="no-matches">No matches today</p>
      ) : (
        Object.keys(matches).map((competitionCode) => {
          const competition = matches[competitionCode];
          return (
            <div key={competitionCode} className="competition-container">
              <h3 className="competition-name">{competition.competitionName}</h3>
              {competition.matches.length === 0 ? (
                <p>No finished matches</p>
              ) : (
                <ul className="matches-list">
                  {competition.matches.map((match, index) => (
                    <li key={index} className="match-item">
                      <div className="team home-team">{match.homeTeam}</div>
                      <div className="score">{match.score}</div>
                      <div className="team away-team">{match.awayTeam}</div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default TodayMatches;
