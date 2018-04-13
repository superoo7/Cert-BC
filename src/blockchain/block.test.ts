import Block from './block'
import BlockChain from './blockchain'
import { BlockChainData } from '../data/class'

describe('Block', () => {
  let bc: BlockChainData
  beforeEach(() => {
    bc = new BlockChain()
  })

  it('genesisBlock test', () => {
    expect(bc.generateGenesisBlock().toString()).toEqual(
      new Block(0, '000000', 'f1r5t', [], 0).toString()
    )
  })
})
