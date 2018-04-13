import Block from './block'
import BlockChain from './blockchain'
import { BlockChainData, BlockData } from '../data/class'
import { DIFFICULTY } from '../config'

describe('BlockChain', () => {
  let bc: BlockChainData, bc2: BlockChainData

  beforeEach(() => {
    bc = new BlockChain()
    bc2 = new BlockChain()
  })

  it('created the genesis block correctly', () => {
    expect(bc.generateGenesisBlock().toString()).toEqual(
      new Block(0, '000000', 'f1r5t', [], 0).toString()
    )
  })

  it('starts with genesisBlock', () => {
    expect(bc.getBlockChain()[0].hash).toEqual(bc.generateGenesisBlock().hash)
  })

  it('sets the `lastHash` to match the hash of the last block.', () => {
    let data = 'bar'
    let lastBlock = bc.generateGenesisBlock()
    let block = bc.mineBlock(lastBlock, data)
    expect(lastBlock.hash).toEqual(block.lastHash)
  })

  it('adds a new block', () => {
    const data = 'foo'
    bc.addBlock(data)
    let chain = bc.getBlockChain()
    expect(chain[chain.length - 1].data).toEqual(data)
  })

  it('validates a valid chain', () => {
    bc2.addBlock('foo')
    expect(bc.isValidChain(bc2.getBlockChain())).toBe(true)
  })

  it('invalidate a chain with a corrupt genesis block', () => {
    // @ts-ignore
    bc2.chain[0].data = 'bad'
    expect(bc.isValidChain(bc2.getBlockChain())).toBe(false)
  })

  it('invalidates a corrupt chain', () => {
    bc2.addBlock('foo')
    // @ts-ignore
    bc2.chain[1].data = 'not foo'

    expect(bc.isValidChain(bc2.getBlockChain())).toBe(false)
  })

  it('replcaes the chain with a valid chain', () => {
    bc2.addBlock('goo')
    bc.replaceChain(bc2.getBlockChain())

    expect(bc.getBlockChain()).toEqual(bc2.getBlockChain())
  })

  it('does not replace the chain with one of less than or equal to length', () => {
    bc.addBlock('foo')
    bc.replaceChain(bc.getBlockChain())

    expect(bc.getBlockChain()).not.toEqual(bc2.getBlockChain())
  })

  it('generate a hash that matches the difficulty', () => {
    let b = bc.generateGenesisBlock()
    let nb = bc.mineBlock(b, 'asd')
    expect(nb.hash.substring(0, DIFFICULTY)).toEqual('0'.repeat(DIFFICULTY))
    console.log(nb.toString())
  })
})
