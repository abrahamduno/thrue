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
    if (thepage == null)
    {
      let currentSubPage = JSON.parse(localStorage.getItem("currentSubPage"))
      if (currentSubPage != null) {
        thepage = currentSubPage
      } else {
        thepage = ""        
      }
    }
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
      pauseMode: true,
      autoMode: false,
      englishMode: true,

      ethereum: window.ethereum,
      isMetaMaskInstalled: isMetaMaskInstalled(),

      accounts: {},
      block: {},
      players: {
        "0":{
          id: "0",
          mmrs: {
            "art": [],
            "ambitions": [],
            "school": [],
            "generations": [],
            "pets": [],
            "hazard": [],
            "supernatural": [],
          },
          q: [],
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
    // clearPreQ(state, playerData) {
    //   // state.players[playerData.id].preQaction  = ""
    //   state.players[playerData.id].preQactions.shift()
    //   // console.log(state.players[playerData.id].preQactions)
    //   // state.players[playerData.id].preQactions.splice(0)
    //   // console.log(state.players[playerData.id].preQactions)
    //   // state.players[playerData.id].preQactions = [...state.players[playerData.id].preQactions]
    //   // let newnew = {preQactions:[]}
    //   // state.players[playerData.id] = { ...state.players[playerData.id], ...newnew }
    //   // for (var i = 0; i < state.players[playerData.id].preQactions.length; i++)
    //   // {
    //   //   state.players[playerData.id].preQactions[] = Date.now()
    //   // }

    //   // state.players[playerData.id].preQactions = [...state.players[playerData.id].preQactions]
    //   // state.players[playerData.id].preQ = null
    //   console.log(state.players[playerData.id], playerData.id)
    // },
    // addToPlayerPreQ(state, playerData) {
    //   if (!playerData.preQ) return
    //   state.players[playerData.preQ.id].preQ = {...{}, ...playerData.preQ}
    //   state.players[playerData.preQ.id].preQactions = [...playerData.preQactions]
    //   // state.players[playerData.preQ.id].preQaction = playerData.preQaction
    //   // state.players[playerData.preQ.id].preQaction = "yes"
    // },
    // clearFirstInY(state, playerData) {
    //   for (var i = state.players[playerData.id].y.length - 1; i >= 0; i--) {
    //     state.players[playerData.id].y.shift(i,1)
    //   }
    //   // state.players[playerData.id].y.slice(0); 
    // },
    // addToPlayerY(state, playerData) {
    //   if (!playerData.y) return
    //   state.players[playerData.id].y = [...state.players[playerData.id].y, ...playerData.y]
    // },
    clearFirstInQ(state, playerData) {
      state.players[playerData.id].q.shift(); 
      for (var i = 0; i < state.players[playerData.id].q.length; i++)
      {
        state.players[playerData.id].q[i].t = Date.now()
      }
    },
    addToPlayerQ(state, playerData) {
      if (!playerData.q) return
      state.players[playerData.id].q = [...state.players[playerData.id].q, ...playerData.q]
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
    setCurrentSubPage(state, subPage) {
      state.currentSubPage = subPage
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
    setPauseMode(state, mode) {
      // console.log("pauseh")
      state.pauseMode = mode
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
    addToPlayerQ(context, playerData) {
      context.commit('addToPlayerQ', playerData);
    },
    clearFirstInQ(context, playerData) {
      context.commit('clearFirstInQ', playerData);
    },
    // addToPlayerY(context, playerData) {
    //   context.commit('addToPlayerY', playerData);
    // },
    // clearFirstInY(context, playerData) {
    //   context.commit('clearFirstInY', playerData);
    // },
    // clearPreQ(context, playerData) {
    //   context.commit('clearPreQ', playerData);
    // },
    // addToPlayerPreQ(context, playerData) {
    //   context.commit('addToPlayerPreQ', playerData);
    // },

    setCurrentSubPage(context, subPage) {
      context.commit('setCurrentSubPage', subPage);
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
    setPauseMode(context, mode) {
      context.commit('setPauseMode', mode);
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
      // console.log("context.getters.current_sub_page", context.getters.current_sub_page)
      if (context.getters.current_sub_page == "test")
      {
        context.commit('setTestingConnect', true);
        console.log("context.getters.is_playing_test", context.getters.is_playing_test)
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
    pause_mode(state) {
      return state.pauseMode
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