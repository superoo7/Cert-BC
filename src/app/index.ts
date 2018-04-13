import * as express from 'express'
import * as bodyParser from 'body-parser'

import BlockChain from '../blockchain/blockchain'
import P2pServer from './p2p-server'

const HTTP_PORT: number = process.env.HTTP_PORT || 3001

// Initialize Blockchain
const bc = new BlockChain()

// Setup Express REST SERVER
const app = express()
app.use(bodyParser.json())
const p2pServer = new P2pServer(bc)

app.get('/blocks', (req, res) => {
  res.json(bc.getBlockChain())
})

app.post('/mine', (req, res) => {
  const block = bc.addBlock(req.body.data)
  console.log(`New Block is added ${block.toString()}`)
  p2pServer.syncChains()
  res.redirect('/blocks')
})

app.post('/')

app.listen(HTTP_PORT, () => {
  console.log(`Listening on port ${HTTP_PORT}`)
})

p2pServer.listen()
