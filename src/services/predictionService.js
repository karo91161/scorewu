import axios from 'axios';
import * as tf from '@tensorflow/tfjs';

const API_URL = 'https://scorewu-server.onrender.com';

export async function fetchPredictionForToday() {
  try {
    const response = await axios.get(`${API_URL}/prediction-today`);
    return response.data;
  } catch (error) {
    console.error('Error fetching prediction:', error);
    throw error;
  }
}

export async function calculatePredictions(teamPerformance) {
  try {
    if (!teamPerformance || !teamPerformance.matches) {
      return {};
    }

    const matches = teamPerformance.matches;

    const maxGoalsFor = Math.max(...matches.map(m => m.goalsFor));
    const maxGoalsAgainst = Math.max(...matches.map(m => m.goalsAgainst));

    const inputs = matches.map(match => [
      match.goalsFor / maxGoalsFor,
      match.goalsAgainst / maxGoalsAgainst,
      match.home ? 1 : 0
    ]);

    const labels = matches.map(match => {
      if (match.result === 'win') {
        return 0;
      } else if (match.result === 'draw') {
        return 1;
      } else if (match.result === 'loss') {
        return 2;
      }
    });

    const xs = tf.tensor2d(inputs);
    const ys = tf.tensor1d(labels).toFloat();

    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 32, inputShape: [3], activation: 'relu' }));
    model.add(tf.layers.dropout({ rate: 0.5 }));
    model.add(tf.layers.dense({ units: 16, activation: 'relu' }));
    model.add(tf.layers.dropout({ rate: 0.5 }));
    model.add(tf.layers.dense({ units: 3, activation: 'softmax' }));

    model.compile({
      optimizer: tf.train.adam(0.001),
      loss: 'sparseCategoricalCrossentropy',
      metrics: ['accuracy']
    });

    await model.fit(xs, ys, {
      epochs: 200,
      batchSize: 16,
      validationSplit: 0.2,
    });

    const predictions = model.predict(xs).arraySync();

    const totalMatches = predictions.length;
    const wins = predictions.filter(pred => pred.indexOf(Math.max(...pred)) === 0).length;
    const draws = predictions.filter(pred => pred.indexOf(Math.max(...pred)) === 1).length;
    const losses = predictions.filter(pred => pred.indexOf(Math.max(...pred)) === 2).length;

    const totalGoalsFor = matches.reduce((acc, match) => acc + match.goalsFor, 0);
    const totalGoalsAgainst = matches.reduce((acc, match) => acc + match.goalsAgainst, 0);

    const winProbability = ((wins / totalMatches) * 100).toFixed(2);
    const drawProbability = ((draws / totalMatches) * 100).toFixed(2);
    const lossProbability = ((losses / totalMatches) * 100).toFixed(2);
    const avgGoalsFor = (totalGoalsFor / totalMatches).toFixed(2);
    const avgGoalsAgainst = (totalGoalsAgainst / totalMatches).toFixed(2);

    const homeMatches = matches.filter(match => match.home);
    const awayMatches = matches.filter(match => !match.home);

    const homeWins = homeMatches.filter((match, index) => predictions[index].indexOf(Math.max(...predictions[index])) === 0).length;
    const awayWins = awayMatches.filter((match, index) => predictions[index].indexOf(Math.max(...predictions[index])) === 0).length;

    const homeWinProbability = ((homeWins / homeMatches.length) * 100).toFixed(2);
    const awayWinProbability = ((awayWins / awayMatches.length) * 100).toFixed(2);

    const goalDifferences = matches.map(match => match.goalsFor - match.goalsAgainst);
    const goalDiffCounts = {};
    goalDifferences.forEach(diff => {
      if (!goalDiffCounts[diff]) {
        goalDiffCounts[diff] = 0;
      }
      goalDiffCounts[diff] += 1;
    });

    const mostLikelyGoalDifference = Object.keys(goalDiffCounts).reduce((a, b) => goalDiffCounts[a] > goalDiffCounts[b] ? a : b);

    return {
      winProbability,
      drawProbability,
      lossProbability,
      avgGoalsFor,
      avgGoalsAgainst,
      homeWinProbability,
      awayWinProbability,
      mostLikelyGoalDifference,
    };
  } catch (error) {
    console.error('Failed to calculate predictions:', error);
    throw error;
  }
}

