#!/usr/bin/env node
import express from 'express';


const app = express();

app.get('/', (req, res) => {
  res.send('hi There')
})

app.listen(3005, () => {
  console.log('Listening on 3005')
})