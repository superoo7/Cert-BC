import * as Websocket from 'ws'

export interface BlockData {
  timestamp: number
  lastHash: string
  hash: string
  data: any
  nonce: number
  toString(): string
  //   genesis(): GenesisBlockData
}

export interface BlockChainData {
  difficulty: number
  getBlockChain(): BlockData[]
  addBlock(data: any): BlockData
  getLastBlock(): BlockData
  generateGenesisBlock(): BlockData
  mineBlock(l: BlockData, d: any): BlockData
  hash(t: number, lh: string, data: any, nonce: number): string
  isValidChain(chain: BlockData[]): boolean
  replaceChain(chain: BlockData[]): void
}

export interface P2pServerData {
  blockchain: BlockChainData
  sockets: Websocket[]
  listen(): void
  connectSocket(socket: Websocket): void
  connectToPeers(): void
}

export interface TransactionData {
  cert: Cert | boolean
  createdTime: number
  error: undefined | { name: string; type: boolean }[]
}

export type Cert = {
  address: string
  avatar: string
  category: string
  country: string
  date: number
  documents: {
    ideaku: {
      _id: string
      hash: string
      certificate: number
      payment: string
      receipt: number
    }
  }
  latitude: number
  lngitude: number
  media: string
  media_name: string
  name: string
  isPrivate: boolean
  title: string
}
