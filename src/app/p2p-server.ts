import * as Websocket from 'ws'
import { BlockChainData, P2pServerData, BlockData } from '../data/class'

const P2P_PORT: number = process.env.P2P_PORT || 5001
const peers: string[] = process.env.PEERS ? process.env.PEERS.split(',') : []

export default class P2pServer implements P2pServerData {
  constructor(public blockchain: BlockChainData, public sockets: Websocket[] = []) {}

  listen(): void {
    const server = new Websocket.Server({ port: P2P_PORT })
    server.on('connection', (socket: Websocket) => {
      this.connectSocket(socket)
    })

    this.connectToPeers()

    console.log(`Listening to p2p connections on ${P2P_PORT}`)
  }

  // Add socket to socketList
  connectSocket(socket: Websocket): void {
    this.sockets = [...this.sockets, socket]
    console.log('Socket connected')
    this.messageHandler(socket)
    this.sendChain(socket)
  }

  // connect to the peers
  connectToPeers(): void {
    peers.map(peer => {
      const socket = new Websocket(peer)
      socket.on('open', () => this.connectSocket(socket))
    })
  }

  messageHandler(socket: Websocket) {
    socket.on('message', (message: string) => {
      const data = JSON.parse(message)
      this.blockchain.replaceChain(data)
    })
  }

  sendChain(socket: Websocket): void {
    socket.send(JSON.stringify(this.blockchain.getBlockChain()))
  }

  syncChains() {
    this.sockets.map((socket: Websocket) => {
      this.sendChain(socket)
    })
  }
}
