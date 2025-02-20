require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const cors =require('cors')
// API Key from football-data.org
const API_KEY = process.env.API_KEY;
const BASE_URL = 'https://api.football-data.org/v4';

// Configure axios instance with the necessary headers
const api = axios.create({
  headers: {
    'X-Auth-Token': API_KEY, // Use your actual API key here
  },
});
app.use(cors())
// Home route with basic info
app.get('/', (req, res) => {
  res.send('Football Data API - Customized Express App');
});
// app.get('/today-matches', async (req, res) => {
//   try {
//     const response = await api.get(`${BASE_URL}/matches`);
//     const matches = response.data.matches;

//     // Return matches with home and away teams and their status


//     res.json(matches);
//   } catch (error) {
//     console.error('Error fetching today\'s matches:', error);
//     res.status(500).send('Error fetching today\'s matches');
//   }
// });
// Fetch today’s matches
app.get('/live', async (req, res) => {
  try {
    const response = await api.get(`${BASE_URL}/matches`);
    const matches = response.data.matches;

    // Filter only finished matches with score available
    const finishedMatches = matches.map(match => ({
      homeTeam: match.homeTeam.name,
      awayTeam: match.awayTeam.name,
      score: `${match.score.fullTime.home !== null && match.score.fullTime.home !== undefined ? match.score.fullTime.home : 0} - ${match.score.fullTime.away !== null && match.score.fullTime.away !== undefined ? match.score.fullTime.away : 0}`,
      status: match.status,
      competition: match.competition.name,
      competitionCode: match.competition.code,
    }));

    // Group matches by competition
    const matchesByCompetition = finishedMatches.reduce((acc, match) => {
      const competitionCode = match.competitionCode;
      if (!acc[competitionCode]) {
        acc[competitionCode] = {
          competitionName: match.competition,
          matches: [],
        };
      }
      acc[competitionCode].matches.push(match);
      return acc;
    }, {});

    // Send the grouped matches by competition
    res.json(matchesByCompetition);
  } catch (error) {
    console.error('Error fetching live matches:', error);
    res.status(500).send('Error fetching live matches');
  }
});



// Fetch matches of a specific competition (e.g., Champions League)
app.get('/competitions/:competitionCode/upcoming', async (req, res) => {
  const competitionCode = req.params.competitionCode; // Get the competition (league) code, e.g., "PL", "SA", "DED"
  try {
    const response = await api.get(`${BASE_URL}/competitions/${competitionCode}/matches?status=SCHEDULED`);
    const matches = response.data.matches;

    res.json(matches);
  } catch (error) {
    console.error(`Error fetching upcoming matches for competition ${competitionCode}:`, error);
    res.status(500).send(`Error fetching upcoming matches for competition ${competitionCode}`);
  }
});


// Fetch all upcoming matches for a team (e.g., Real Madrid)
app.get('/teams/:teamId/upcoming', async (req, res) => {
  const teamId = req.params.teamId; // Team ID, e.g., Real Madrid's ID is 86
  try {
    const response = await api.get(`${BASE_URL}/teams/${teamId}/matches?status=SCHEDULED`);
    const matches = response.data.matches;

    res.json(matches);
  } catch (error) {
    console.error(`Error fetching upcoming matches for team ${teamId}:`, error);
    res.status(500).send(`Error fetching upcoming matches for team ${teamId}`);
  }
});

// Fetch league standings (e.g., for the Premier League)
app.get('/competitions/:competition/standings', async (req, res) => {
  const competition = req.params.competition; // Example: 'PL' for Premier League
  try {
    const response = await api.get(`${BASE_URL}/competitions/${competition}/standings`);
    const standings = response.data.standings;

    res.json(standings);
  } catch (error) {
    console.error(`Error fetching standings for competition ${competition}:`, error);
    res.status(500).send(`Error fetching standings for competition ${competition}`);
  }
});

// Fetch top scorers of a competition (e.g., Serie A)
app.get('/competitions/:competition/scorers', async (req, res) => {
  const competition = req.params.competition; // Example: 'SA' for Serie A
  try {
    const response = await api.get(`${BASE_URL}/competitions/${competition}/scorers`);
    const scorers = response.data.scorers;

    res.json(scorers);
  } catch (error) {
    console.error(`Error fetching top scorers for competition ${competition}:`, error);
    res.status(500).send(`Error fetching top scorers for competition ${competition}`);
  }
});

// Fetch a player's matches (e.g., for Gigi Buffon)
app.get('/players/:playerId/matches', async (req, res) => {
  const playerId = req.params.playerId; // Example: Buffon has ID 2019
  try {
    const response = await api.get(`${BASE_URL}/persons/${playerId}/matches?status=FINISHED`);
    const matches = response.data.matches;

    res.json(matches);
  } catch (error) {
    console.error(`Error fetching matches for player ${playerId}:`, error);
    res.status(500).send(`Error fetching matches for player ${playerId}`);
  }
});

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
