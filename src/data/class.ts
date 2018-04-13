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
