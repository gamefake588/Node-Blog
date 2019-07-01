<template>
  <div class="footer">
      <!-- 脚注 -->
    <footer class="footer">
      <div class="foot_content">
        Copyright 2019.<a href="https://weibo.com/5738463632/profile?topnav=1&wvr=6&is_all=1" target="view_window">Hugx</a> All Rights Reserved.
      </div>
    </footer>
  </div>
</template>

<script>

export default {
  name: 'footerT',
  components:{
    
  },
  data () {
    return {
      
    }
  }
}
</script>


<style scoped>
/*脚注*/
.footer{
    width: 100%;
    height: 80px;
    background-color: #262a30;
    line-height: 80px;
    margin-top: 2%;
}
.foot_content{
    text-align: center;
    color: #8b8c88;
    transition: all .5s;
}
.foot_content::selection,.foot_content a::selection{
    background-color: #262a30;
    color: #fcfcfc;
}
.foot_content a{
    color: rgba(255,255,255,.7);
    transition: all .5s;
}
.foot_content a:hover{
    color: #039be5;
}
</style>
