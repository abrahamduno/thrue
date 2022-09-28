import { createStore } from 'vuex';
import { ethers, Contract }  from 'ethers';

import { isMetaMaskInstalled } from './helpers';
import { ABIS, CURRENT_NETWORK } from './constants/index';
import { LANG } from './constants/lang';

const store = createStore({
  state() {

    var url_string = window.location.href
    var urlparams = (new URL(url_string)).searchParams;
    // console.log("***",url_string, url);
    var thepage = urlparams.get("page");
    var thefilter = urlparams.get("filter");
    // console.log("page",thepage);
    return {
      LANG,

      currentPseudoPage: "lottery",
      currentSubPage: thepage,
      currentFilter: thefilter,
      currentLevel: "levelThree",
      isPlayingTest: false,
      darkMode: false,
      proMode: false,
      autoMode: false,
      englishMode: true,

      ethereum: window.ethereum,
      isMetaMaskInstalled: isMetaMaskInstalled(),

      accounts: {},
      block: {},
      players: {
        "0":{
          obj: null,
          pos: [0,0,0],
          rot: [0,0,0],
          scale: [1,1,1],
          stats: {
            hunger: -1,
            hygene: -1,
            energy: -1,
            fun: -1,
          },
        },
      }
    };
  },
  mutations: {
    setPlayerObject(state, playerData) {
      const newData = {
        [playerData.id]: playerData, 
      }
      state.players = {...state.players, ...newData}
      // state.players[playerData.id].stats = {...state.players[playerData.id].stats, ...newData.stats}
      // // if (newData.rot) { state.players[playerData.id].rot = [...newData.rot] }
      // if (newData.pos) { state.players[playerData.id].pos = [...newData.pos] }
      // // state.players[playerData.id].pos = {...state.players[playerData.id].pos, ...newData.pos}
      // state.context.commit('setPlayerRotation', playerData);
      // console.log("newset", state.players[playerData.id])
    },
    setPlayerStats(state, playerData) {
      if (!playerData.stats) return
      state.players[playerData.id].stats = {...state.players[playerData.id].stats, ...playerData.stats}
    },
    setPlayerRotation(state, playerData) {
      if (!playerData.rot) return
      state.players[playerData.id].rot = [...playerData.rot] 
    },
    setPlayerPosition(state, playerData) {
      if (!playerData.pos) return
      state.players[playerData.id].pos = [...playerData.pos] 
    },

    setCurrentLevel(state, level) {
      state.currentLevel = level
    },
    setAutoMode(state, mode) {
      state.autoMode = mode
    },
    setDarkMode(state, mode) {
      state.darkMode = mode
    },
    setProMode(state, mode) {
      state.proMode = mode
    },

    setTestingConnect(state, val) {
      state.isPlayingTest = val
    },
    setCurrentPseudoPage(state, _page) {
      state.currentPseudoPage = _page
    },
    setEnglishMode(state, mode) {
      state.englishMode = mode
    },

    setBlockchainObject(state, blockData) {
      const newBlock = {
        [blockData.key]: blockData, 
      }
      state.block = {...state.block, ...newBlock}
    },
    addAccount(state, accountData) {
      const newAccounts = {
        [accountData]: {
          address: accountData,
          balance: 0,
          balances: {},
          allowances: {},
        },
      };

      state.accounts = {...state.accounts, ...newAccounts}
    },
  },
  actions: {
    setPlayer(context, playerData) {
      context.commit('setPlayerObject', playerData);
    },
    setPlayerStats(context, playerData) {
      context.commit('setPlayerStats', playerData);
    },
    setPlayerRotation(context, playerData) {
      context.commit('setPlayerRotation', playerData);
    },
    setPlayerPosition(context, playerData) {
      context.commit('setPlayerPosition', playerData);
    },

    setCurrentLevel(context, level) {
      context.commit('setCurrentLevel', level);
    },
    setAutoMode(context, mode) {
      context.commit('setAutoMode', mode);
    },
    setProMode(context, mode) {
      context.commit('setProMode', mode);
    },
    setDarkMode(context, mode) {
      context.commit('setDarkMode', mode);
    },
    setEnglishMode(context, mode) {
      context.commit('setEnglishMode', mode);
    },
    setNewBlock(context, blockData) {
      context.commit('setBlockchainObject', blockData);
    },
    setTestingConnect(context, val) {
      context.commit('setTestingConnect', val);
    },

    connectWallet: async (context) => {
      if (context.getters.current_sub_page == "test")
      {
        context.commit('setTestingConnect', true);
        return
      }
      if (!context.getters.is_metaMask) { alert("Please, Install Metamask.") }
      let accs = await context.getters.eth.request({ method: 'eth_requestAccounts' }).catch((err) => {
        if (err.code == -32002)
        {
          alert("Unlock or Connect your Wallet and\ntry Again...")
        }
      })
      if(typeof accs == "undefined") { console.log("Unlock or Connect Wallet and try Again...")}
      for (var i = 0; i < accs.length; i++) {
        console.log(accs[i])
        context.commit('addAccount', accs[i]);
      }
    },

  },
  getters: {
    getPlayers(state) {
      return state.players;
    },
    getPlayer(state) {
      return (id = 0) => {
        return state.players[id];
      };
    },

    current_page(state) {
      return state.currentPseudoPage
    },
    current_sub_page(state) {
      return state.currentSubPage
    },
    is_playing_test(state) {
      return state.isPlayingTest
    },
    current_filter(state) {
      return state.currentFilter
    },
    LANG(state) {
      return state.LANG[state.englishMode ? "EN" : "ES"];
    },

    current_level(state) {
      return state.currentLevel
    },

    auto_mode(state) {
      return state.autoMode
    },
    dark_mode(state) {
      return state.darkMode
    },
    pro_mode(state) {
      return state.proMode
    },
    english_mode(state) {
      return state.englishMode
    },


    eth(state) {
      return state.ethereum
    },
    newProvider(state) {
      return new ethers.providers.Web3Provider(state.ethereum)
    },
    is_metaMask(state) {
      return state.isMetaMaskInstalled;
    },

    accs_length(state) {
      return Object.keys(state.accounts).length;
    },
    accounts(state) {
      return state.accounts;
    },
    first_acc(state) {
      if (Object.keys(state.accounts) == 0) return null
      let firstAccAddress = Object.keys(state.accounts)[0]

      return state.accounts[firstAccAddress];
    },
    account(state) {
      return (address) => {
        return state.accounts[address];
      };
    },
    getBlock(state) {
      return (key) => {
        return state.block[key];
      };
    },


  },
});

export default store;