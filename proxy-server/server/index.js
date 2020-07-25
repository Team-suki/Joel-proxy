const nr = require('newrelic');
const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

const rewardsServiceRoute =
  'http://ec2-3-133-92-215.us-east-2.compute.amazonaws.com:3005';

const proxyRouter = {
  'api/Story': 'http://ec2-54-219-19-207.us-west-1.compute.amazonaws.com/',
  'api/RisksAndChallenges': 'http://ec2-54-219-19-207.us-west-1.compute.amazonaws.com/',
  'api/EnvironmentalCommitments': 'http://ec2-54-219-19-207.us-west-1.compute.amazonaws.com/',

  'api/update': 'http://ec2-3-15-166-80.us-east-2.compute.amazonaws.com:3001',
  'api/comment': 'http://ec2-3-15-166-80.us-east-2.compute.amazonaws.com:3001'
};

app.use(express.static(path.join(__dirname, '../public')));

app.get('/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.use(
  createProxyMiddleware({
    target: '/:id',
    router: proxyRouter,
    changeOrigin: true,
    prependPath: false,
  })
);

app.listen(4000, () => {
  console.log('Proxy Server is listening on port 4000');
});
