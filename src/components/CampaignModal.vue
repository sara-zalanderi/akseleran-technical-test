<template>
  <div class="campaign-modal">
    <transition name="modal">
			<div class="modal-mask">
				<div class="modal-wrapper">
					<div class="modal-container">
						<div class="modal-header">
							<slot name="header">
								Default Header
							</slot>
							<a class="modal-delete" @click="$emit('close')">x</a>
						</div>
						<div class="modal-body">
							<div
								class="modal-section"
								v-for="(item, index) in investData"
								:key="index"
							>
								<div class="modal-content">{{ item.name }}</div>
								<input 
									type="number" 
									placeholder="Amount to Invest" 
									v-if="!isFinal" 
									v-model="sumInvest[index]"
								>
								<input 
									type="number" 
									placeholder="Update Invest Amount" 
									v-if="isFinal" 
									v-model="item.value"
								>
								<a class="modal-delete" @click="deleteData(index)">x</a>
							</div>
						</div>
						<div class="modal-footer">							
							<button class="modal-default-button" @click="validateAmount">
								<slot name="footer">
									OK
								</slot>
							</button>
						</div>
					</div>
				</div>
			</div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'CampaignModal',
  props: {
    investData: {
      type: Array,
      default: () => [],
    },
    isFinal: {
      type: Boolean,
      required: true,
    },
    userBalance: {
      type: Number,
      required: true,
    },
	},
  data() {
    return {
			sumInvest: [],
    };
  },
	methods: {
		validateAmount(){
			let sumAllInvest = 0;
			if(this.isFinal == true){
				for(let i=0; i<this.investData.length; i++){
					this.investData[i].value = parseInt(this.investData[i].value, 10);
				}
				for(let item of this.investData){
					sumAllInvest = sumAllInvest + item.value;
				}
				if(sumAllInvest > this.userBalance){
					alert("Balance not enough, reduce the amount to invest");
				}
				else{
					let reducedBalance = this.userBalance - sumAllInvest;
					this.$emit('remainingBalance', reducedBalance);
					this.$emit('investFinal', []);
					this.$store.state.userBalance = reducedBalance;
					this.$store.commit('mutateUserBalance');
					this.$emit('close');
				}
			}
			else{
				for(let i=0; i<this.sumInvest.length; i++){
					this.sumInvest[i] = parseInt(this.sumInvest[i], 10);
					this.investData[i].value = this.sumInvest[i];
				}
				sumAllInvest = this.sumInvest.reduce((a, b) => a + b, 0);
				if(sumAllInvest > this.userBalance){
					alert("Balance not enough, reduce the amount to invest");
				}
				else{
					this.$emit('investFinal', this.investData);
					this.$emit('close');
				}
			}
		},
		deleteData(index){
			this.investData.splice(index, 1);
			this.sumInvest.splice(index, 1);
		},
	}
}
</script>

<style>
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
	input[type=number] {
		-moz-appearance: textfield;
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
  .modal-mask {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		display: table;
		transition: opacity 0.3s ease;
		text-align: left;
	}
	.modal-wrapper {
		display: table-cell;
		vertical-align: middle;
		padding: 0 20%;
	}
	.modal-container {
		margin: 0px auto;
		padding: 20px 30px;
		background-color: #2A3990;
		color: white;
		border-radius: 2px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
		transition: all 0.3s ease;
	}
	.modal-header {
		position: relative;
	}
	.modal-header h3 {
		margin-top: 0;
	}
	.modal-body {
		margin: 20px 0;
	}
	.modal-section {
		display: inline-block;
    width: calc(100% / 3);
    padding: 10px;
    border-radius: 4px;
		border: 1px solid rgba(255,255,255,.75);
		margin: 10px;
		position: relative;
	}
	.modal-section input {
		width: 100%;
		margin-top: 20px;
	}
	.modal-content {
		padding-right: 15px;
	}
	.modal-delete {
		cursor: pointer;
		position: absolute;
		top: 5px;
		right: 10px;
	}
	.modal-footer {
		text-align: right;
	}
</style>
