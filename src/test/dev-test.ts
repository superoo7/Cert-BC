import Block from '../blockchain/block'
import BlockChain from '../blockchain/blockchain'
import { SHA256 } from 'crypto-js'
import { BlockChainData, BlockData } from '../data/class'

let bc: BlockChainData = new BlockChain()
let genesis = bc.generateGenesisBlock()
let foo: BlockData = bc.mineBlock(genesis, [])
console.log(foo.toString())
