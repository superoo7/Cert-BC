import { BlockChainData, BlockData } from '../data/class'
import Block from './block'
import { DIFFICULTY } from '../config'
import { SHA256 } from 'crypto-js'

export default class BlockChain implements BlockChainData {
  private chain: BlockData[]
  constructor(public difficulty: number = DIFFICULTY) {
    this.chain = [this.generateGenesisBlock()]
  }

  getBlockChain(): BlockData[] {
    return this.chain
  }

  addBlock(data: any): BlockData {
    const block = this.mineBlock(this.getLastBlock(), data)
    this.chain = [...this.chain, block]

    return block
  }

  getLastBlock(): BlockData {
    return this.chain[this.chain.length - 1]
  }

  generateGenesisBlock(): BlockData {
    return new Block(0, '000000', 'f1r5t', [], 0)
  }

  mineBlock(lastBlock: BlockData, data: any): BlockData {
    let hash, timestamp
    const lastHash = lastBlock.hash

    let nonce = 0
    do {
      nonce++
      timestamp = Date.now()
      hash = this.hash(timestamp, lastHash, data, nonce)
      console.log(hash)
    } while (!hash.startsWith(Array(this.difficulty + 1).join('0')))

    return new Block(timestamp, lastHash, hash, data, nonce)
  }

  hash(timestamp: number, lastHash: string, data: any, nonce: number): string {
    return SHA256(`${timestamp}${lastHash}${data}${nonce}`).toString()
  }

  blockHash(block: BlockData): string {
    const { timestamp, lastHash, data, nonce } = block
    return this.hash(timestamp, lastHash, data, nonce)
  }

  isValidChain(chain: BlockData[]): boolean {
    let res
    if (JSON.stringify(chain[0]) !== JSON.stringify(this.generateGenesisBlock())) return false

    for (let i = 1; i < chain.length; i++) {
      const block = chain[i]
      const lastBlock = chain[i - 1]

      if (block.lastHash !== lastBlock.hash || block.hash !== this.blockHash(block)) return false
    }

    return true
  }

  replaceChain(newChain: BlockData[]): void {
    if (newChain.length <= this.chain.length) {
      console.log('Received chain is not longer than the current chain')
      return
    } else if (!this.isValidChain(newChain)) {
      console.log('The received chain is not valid')
      return
    }

    // Replace chain
    console.log('Replacing blockchain with the new chain')
    this.chain = newChain
  }
}
