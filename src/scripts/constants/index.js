// import 
import * as TheOpenLottoDAO from './TheOpenLottoDAO.json';
import * as TheOpenLotto from './TheOpenLotto.json';
import * as VRFv2Consumer from './VRFv2Consumer.json';
import * as TheOpenSimulation from './TheOpenSimulation.json';

export const ABIS = {
  DAO: TheOpenLottoDAO.abi,
  LOTTO: TheOpenLotto.abi,
  RESOLVER: VRFv2Consumer.abi,
  SIMULATION: TheOpenSimulation.abi,

  ERC20: [
    'function owner() external view returns (address)',
    'function transfer(address to, uint value) external returns (bool)',
    'function balanceOf(address account) external pure returns (uint256)',
    'function approve(address spender, uint256 amount) external returns (bool)',
    'function allowance(address owner, address spender) external view returns (uint)',
  ],
};

// https://docs.chain.link/docs/matic-addresses/
export const polygonNetwork = {
  SCANNER_URL: 'https://polygonscan.com',
  RPC_URL: 'https://rpc-mainnet.matic.quiknode.pro',

  BASE_TOKEN: 'MATIC',
  BASE_USD_ID: 'USD (DAI)',
  BASE_USD_ADDRESS: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',

  RESOLVER_ADDRESS: '0x4C5f09D239E11896ed4B21e5BEba0DE9D777eEbD',
  LOTTO_ADDRESS: '0x9ea7574d0E7A2cd3A041eCfe29F97AeF71E47b93',
  DAO_ADDRESS: '0x1b9aD45fc26ee4f3Ae0A6D2bb5d2B31733f5E83E',
  SIMULATION_ADDRESS: '0x19fCAF40135A09766a2ff099e9609e4Ff8851D32',

  MULTICALL_ADDRESS: '0x275617327c958bD06b5D6b871E7f491D76113dd8',
};
// https://docs.chain.link/docs/matic-addresses/
export const localNetwork = {
  SCANNER_URL: 'https://google.com',
  RPC_URL: 'localhost:8545',

  BASE_TOKEN: 'ETH',
  BASE_USD_ID: 'USD (DAI)',
  BASE_USD_ADDRESS: '0xD704cED92Cc82D05D932364459EF14C1Dc5D9d61',

  RESOLVER_ADDRESS: '0x5866c15DC432dA5cc3928E06d2E510A738963669',
  LOTTO_ADDRESS: '0x6c652937623b816343F2ba32c8d840F6cDaE0820',
  DAO_ADDRESS: '0x50C48f8C651191405644Ed03C8B9373b3531B338',
  SIMULATION_ADDRESS: '0x19fCAF40135A09766a2ff099e9609e4Ff8851D32',
  
  MULTICALL_ADDRESS: '0xFEfDf422efD090902aE513483DF31c420Dca7691',
};

// export const CURRENT_NETWORK = bscNetwork;
// export const CURRENT_NETWORK = ftmNetwork;
// export const CURRENT_NETWORK = maticNetwork;
export const CURRENT_NETWORK = polygonNetwork;
// export const CURRENT_NETWORK = localNetwork;

export const STATE_CONSTANTS = {
  "energy": {
    title:"Energy",
    iconClass:"fas fa-bolt",
  },
  "fun": {
    title:"Fun",
    iconClass:"fas fa-smile-beam",
  },
  "hygene": {
    title:"Hygene",
    iconClass:"fas fa-shower",
  },
  "protein": {
    title:"Protein",
    iconClass:"fas fa-hamburger",
  },
};
export const STATUS_CONSTANTS = {
  "focus": {
    title:"Focus",
    under: "Intuition",
    over: "Senses",
    iconClass:"fas fa-shower",
  },
  "process": {
    title:"Process",
    under: "Feelings",
    over: "Logic",
    iconClass:"fas fa-smile-beam",
  },
  "action": {
    title:"Action",
    under: "Inwards",
    over: "Outwards",
    iconClass:"fas fa-bolt",
  },
};
export const MEMORY_CATEGORY_CONSTANTS = {
  "supernatural": {
    title: "Supernatural",
  }, 
  "ambition": {
    title: "Ambition",
  }, 
  "art": {
    title: "Art",
  }, 
  "hazards": {
    title: "Hazards",
  }, 
  "logic": {
    title: "Logic",
  }, 
  "pets": {
    title: "Pets",
  }, 
  "social": {
    title: "Social",
  }, 
  "sports": {
    title: "Sports",
  }
};
export const MEMORY_CATEGORY_LIST = [ "supernatural", "ambition", "art", "hazards", "logic", "pets", "social", "sports", ];
export const STATE_LIST = [ "energy", "fun", "hygene", "protein" ];
export const STATUS_LIST = [ "focus", "process", "action" ];