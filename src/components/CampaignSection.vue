<template>
  <div class="campaignlist">
    <div class="campaignlist__header">
      <h3 class="campaignlist__name"><strong>{{ campaignData.name }}</strong></h3>
    </div>
    <div class="campaignlist__section">
      <div class="campaignlist__progress">
        Telah terkumpul <strong>{{ campaignData.percentage }}%</strong> dari <strong>{{ campaignData.lender_count }}</strong> lenders
        <div class="campaignlist__progressbg">
          <span class="campaignlist__progressbar" :style="{ 'width': campaignData.percentage + '%' }"></span>
        </div>
      </div>
      <div class="campaignlist__content">
        <label>Jumlah pinjaman</label>
        <p>{{ campaignData.lending_amount | toCurrencyFormat }}</p>
      </div>
      <div class="campaignlist__content">
        <label>Tenor</label>
        <p>{{ campaignData.tenor }} Bulan</p>
      </div>
      <div class="campaignlist__content">
        <label>Bunga efektif</label>
        <p>{{ campaignData.interest }}%</p>
      </div>
      <div class="campaignlist__content">
        <label>Agunan</label>
        <p>{{ campaignData.collateral }}</p>
      </div>
      <div class="campaignlist__content">
        <label>Frek. angsuran pokok</label>
        <p>{{ campaignData.main_installment }}</p>
      </div>
      <div class="campaignlist__content">
        <label>Frek. angsuran bunga</label>
        <p>{{ campaignData.interest_installment }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CampaignSection',
  props: {
    campaignData: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

<style>
  .campaignlist{
    border-radius: 4px;
    position: relative;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);
  }
  .campaignlist__header{
    background-image: url('/src/assets/akseleran.jpg');
    min-height: 150px;
    display: table;
    border-radius: 4px 4px 0 0;
    background-size: auto 100%;
  }
  .campaignlist__name{
    display: table-cell;
    vertical-align: bottom;
    padding: 0 15px 15px;
    color: white;
    background-color: rgba(0,0,0,.55);
    border-radius: 4px 4px 0 0;
  }
  .campaignlist__section{
    padding: 15px;
    display: table;
    width: 100%;
  }
  .campaignlist__progress{    
    margin-bottom: 10px;
  }
  .campaignlist__progressbg{
    width: 100%;
    height: 10px;
    background-color: #cce2ff;
    border-radius: 20px;
  }
  .campaignlist__progressbar{
    background-color: #569ED2;
    display: block;
    height: 100%;
    border-radius: 20px;
    margin: 10px 0;
  }
  .campaignlist__content{
    display: inline-block;
    width: 50%;
  }
  .campaignlist__content label{
    font-size: 12px;
  }
  .campaignlist__content p{
    margin: 0 0 10px;
    font-weight: bold;
  }
</style>
