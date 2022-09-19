import { createStore } from 'vuex';
import { ethers, Contract }  from 'ethers';

import { isMetaMaskInstalled } from './helpers';
import { ABIS, CURRENT_NETWORK } from './constants';
import { LANG } from './lang';

const store = createStore({
  state() {

    var url_string = window.location.href
    var urlparams = (new URL(url_string)).searchParams;
    // console.log("***",url_string, url);
    var thepage = urlparams.get("page");
    // console.log("page",thepage);
    return {
      currentPseudoPage: "lottery",
      currentSubPage: thepage,
      LANG,
      darkMode: false,
      proMode: false,
      englishMode: true,

      ethereum: window.ethereum,
      isMetaMaskInstalled: isMetaMaskInstalled(),

      accounts: {},
      block: {},
    };
  },
  mutations: {
    setDarkMode(state, mode) {
      state.darkMode = mode
    },
    setProMode(state, mode) {
      state.proMode = mode
    },

    setCurrentPseudoPage(state, _page) {
      state.currentPseudoPage = _page
    },
    setEnglishMode(state, mode) {
      state.englishMode = mode
    },

    addBlockchainObject(state, blockData) {
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
      context.commit('addBlockchainObject', blockData);
    },

    connectWallet: async (context) => {
      if (!context.getters.is_metaMask) { alert("Please, Install Metamask.") }
      let accs = await context.getters.eth.request({ method: 'eth_requestAccounts' }).catch((err) => {
        if (err.code == -32002)
        {
          alert("Unlock or Connect your Wallet and\ntry Again...")
        }
      })
      if(typeof accs == "undefined") { console.log("Unlock or Connect Wallet and try Again...")}
      for (var i = 0; i < accs.length; i++) {
        context.commit('addAccount', accs[i]);
      }
    },

  },
  getters: {
    current_page(state) {
      return state.currentPseudoPage
    },
    current_sub_page(state) {
      return state.currentSubPage
    },
    LANG(state) {
      return state.LANG[state.englishMode ? "EN" : "ES"];
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