<template>
  <div id="app">
    <div class="campaignheader">
      <h3 class="campaignheader__balance">Balance : {{ remainBalance | toCurrencyFormat }}</h3>
      <div class="campaignheader__searchbox">
        <input 
          type="text" 
          class="width-100"
          placeholder="Search Campaign" 
          v-model="searchQuery" 
        />
      </div>
      <div class="campaignheader__radiosort">
        <label class="campaignheader__sort">Sort by</label>
        <div class="campaignheader__radio">
          <label class="campaignheader__radiolabel campaignheader__radiolabel--margin">
            <input type="radio" class="campaignheader__radiobtn" name="radio" @click="ascend">
            <div class="campaignheader__radiobox">Pinjaman Terkecil</div>
          </label>
          <label class="campaignheader__radiolabel">
            <input type="radio" class="campaignheader__radiobtn" name="radio" @click="descend">
            <div class="campaignheader__radiobox">Pinjaman Terbesar</div>
          </label>
        </div>
      </div>
    </div>
    <div 
      class="campaignbody"
      v-if="campaignList.length"
    >
      <label
        class="campaignbody__list"
        v-for="(item, index) in resultQuery"
        :key="index"
      >
        <input type="checkbox" class="campaignbody__checkbox" :value="item" v-model="checkedNames">
        <campaign-section class="campaignbody__section" :campaign-data="item"/>
      </label>
    </div>
    <div class="campaignfooter">
      <div class="campaignfooter__wrapper">
        <button 
          class="campaignfooter__button" 
          @click="showInvest = true" 
          :disabled="checkedNames == 0"
        >
          Invest to Selected Campaigns
        </button>
        <campaign-modal 
          v-if="showInvest" 
          @close="showInvest = false" 
          :user-balance="userBalance"
          :invest-data="checkedNames"
          @investFinal="investFinal = $event"
          :is-final="false"
        >
          <h3 slot="header">Enter Amount to Invest</h3>
          <span slot="footer">Save</span>
        </campaign-modal>
        <button 
          class="campaignfooter__button"
          @click="showCheckout = true"
          :disabled="investFinal == 0"
        >
          Checkout
        </button>
        <campaign-modal 
          v-if="showCheckout" 
          @close="showCheckout = false"
          :user-balance="userBalance"
          :invest-data="investFinal"
          :is-final="true"
          @remainingBalance="remainingBalance = $event"
          @investFinal="investFinal = $event"
        >
          <h3 slot="header">Campaign Cart</h3>
          <span slot="footer">Checkout</span>
        </campaign-modal>
      </div>
    </div>
  </div>
</template>

<script>
import campaignLists from './config/campaign-list.json';
import campaignSection from './components/CampaignSection';
import campaignModal from './components/CampaignModal';

export default {
  name: 'App',
  components: {
    campaignSection,
    campaignModal,
  },
  data() {
    return {
      campaignList: {},
      campaignLists,
      searchQuery: null,
      userBalance: 0,
      showInvest: false,
      showCheckout: false,
      checkedNames: [],
      investFinal: [],
      remainingBalance: null,
    };
  },
  computed: {
    resultQuery() {
      let filtered = this.campaignList;
      if (this.searchQuery) {
        filtered = filtered.filter(
          m => this.searchQuery.toLowerCase().split(' ').every(v => m.name.toLowerCase().includes(v))
        );
      }
      return filtered;
    },
    remainBalance() {
      if(this.remainingBalance > 0){
        return this.userBalance = this.remainingBalance;
      }
      else{
        return this.userBalance;
      }
    },
  },
  methods: {
    ascend() {
      this.campaignList.sort((a,b) => (a.lending_amount > b.lending_amount) ? 1 : ((b.lending_amount > a.lending_amount) ? -1 : 0));
    },
    descend() {
      this.campaignList.sort((a,b) => (a.lending_amount < b.lending_amount) ? 1 : ((b.lending_amount < a.lending_amount) ? -1 : 0));
    },
  },
  mounted() {
    this.campaignList = campaignLists.campaigns;
    this.userBalance = this.$store.state.userBalance;
  },
}
</script>

<style>
  *{
    box-sizing: border-box;
  }
  body{
    margin: 0;
    font-family: PoppinsRegular;
  }
  @font-face {
    font-family: PoppinsRegular;
    src: url('/src/assets/fonts/Poppins-Regular.ttf');
  }
  input[type="text"]{
    border: none;
    border-bottom: 1px solid rgba(255,255,255,.75);
    display: block;
    margin: 0;
    padding: 4px 0;
    background: 0 0;
    outline: none;
    color: white;
    font-family: PoppinsRegular;
  }
  button{
    cursor: pointer;
    background-color: transparent;
    border: 1px solid rgba(255,255,255,.75);
    padding: 5px 15px;
    color: white;
    border-radius: 4px;
    outline: none;
  }
  ::placeholder {
    color: rgba(255,255,255,.75);
  }
  .width-100{
    width: 100%;
  }
  .campaignheader{
    background-color: #2A3990;
    padding: 0 20%;
    position: relative;
    white-space: nowrap;
    display: table;
    width: 100%;
  }
  .campaignheader__balance{
    color: white;
    margin: 0;
    padding: 15px 10px 0;
  }
  .campaignheader__searchbox{
    width: 50%;
    padding: 10px;
    display: inline-block;
    vertical-align: text-top;
  }
  .campaignheader__radiosort{
    display: inline-block;
    width: 50%;
    padding: 10px;
  }
  .campaignheader__sort{
    color: white;
    display: inline-block;
    width: 100%;
    font-size: 12px;
  }
  .campaignheader__radio{
    display: table;
    width: 100%;
  }
  .campaignheader__radiolabel{
    width: 49%;
    display: inline-block;
    padding: 10px 10px 20px;
    position: relative;
    cursor: pointer;
    font-size: 14px;
    text-align: center;
  }
  .campaignheader__radiolabel--margin{
    margin-right: 2%;
  }
  .campaignheader__radiobtn{
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
  .campaignheader__radiobox{
    position: absolute;
    top: 0;
    left: 0;
    height: auto;
    width: 100%;
    cursor: pointer;
    border: 1px solid rgba(255,255,255,.75);
    padding: 5px 15px;
    color: white;
    border-radius: 4px;
  }
  .campaignheader__radio--button:checked ~ .campaignheader__radio--box{
    color: #2A3990;
    background-color: white;
  }
  .campaignbody{
    padding: 0 20%;
  }
  .campaignbody__list{
    width: 50%;
    display: inline-block;
    padding: 10px;
    position: relative;
    cursor: pointer;
  }
  .campaignbody__checkbox{
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
  .campaignbody__section{
    position: absolute;
    top: 0;
    left: 0;
    height: auto;
    width: 100%;
  }
  .campaignbody__checkbox:checked ~ .campaignbody__section{
    background-color: #2A3990;
    color: white;
  }
  .campaignfooter{
    width: 100%;
    background-color: #9C254D;
    position: fixed;
    bottom: 0;
    padding: 15px 20%;
  }
  .campaignfooter__button{    
    font-size: 16px;
    margin-left: 10px;
  }
  .campaignfooter__button:disabled{    
    background-color: rgba(255,255,255,.75);
    color: #9C254D;
  }
  .campaignfooter__wrapper{
    padding: 0 10px;
    display: flex;
    justify-content: flex-end;
  }
</style>
