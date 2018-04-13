import * as express from 'express'
import * as bodyParser from 'body-parser'

import BlockChain from '../blockchain/blockchain'
import P2pServer from './p2p-server'
import Transaction from '../blockchain/transaction'
import { TransactionData, Cert } from '../data/class'

const HTTP_PORT: number = process.env.HTTP_PORT || 3001

// Initialize Blockchain
const bc = new BlockChain()
let transaction: TransactionData[] = []

// Setup Express REST SERVER
const app = express()
app.use(bodyParser.json())
const p2pServer = new P2pServer(bc)

app.get('/blocks', (req, res) => {
  res.json(bc.getBlockChain())
})

app.post('/mine', (req, res) => {
  let cert: Cert = req.body
  let transaction: TransactionData = new Transaction(Date.now(), cert)

  if (transaction.cert === false) {
    let reply
    try {
      // @ts-ignore
      reply = `Invalid Type for ${transaction.error.map(e => e.name).join(', ')}`
    } catch (e) {
      reply = `Invalid Type`
    }
    res.json({ error: reply })
  }

  const block = bc.addBlock(transaction)
  console.log(`New Block is added ${block.toString()}`)
  p2pServer.syncChains()
  res.redirect('/blocks')
})

// app.get('/blocks/:id', (req, res) => {
//   console.log(req.params.id)
//   res.json({ hello: true })
// })

app.post('/data', (req, res) => {
  let name: string = req.body.name
  let data = bc.findName(name)
  res.json({ name, total_response: data.length, data })
})

app.listen(HTTP_PORT, () => {
  console.log(`Listening on port ${HTTP_PORT}`)
})

p2pServer.listen()
