<template>
  <div class="spec-preview">
    <img :src="imageList.imgUrl" />
    <div class="event" @mousemove="handler"></div>
    <div class="big">
      <img :src="imageList.imgUrl" ref="big"/>
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
  export default {
    name: "Zoom_q",
    props: ['skuImageList'],
    data() {
      return {
        index: 0
      }
    },
    computed: {
      imageList() {
        return this.skuImageList[this.index] || {}
      }
    },
    mounted() {
      // 全局事件总线：获取兄弟组件传递过来的索引值
      this.$bus.$on('getIndex', (index) => {
        this.index = index
      })
    },
    methods: {
      handler(event) {
        let mask = this.$refs.mask
        let big = this.$refs.big
        // offsetX/Y 鼠标到盒子边沿的距离
        let leftX = event.offsetX - mask.offsetWidth/2
        let topY = event.offsetY - mask.offsetHeight/2
        if (leftX <= 0) leftX = 0
        if (leftX >= mask.offsetWidth) leftX = mask.offsetWidth
        if (topY <= 0) topY = 0
        if (topY >= mask.offsetHeight) topY = mask.offsetHeight
        mask.style.left = leftX + 'px'
        mask.style.top = topY + 'px'
        big.style.left = -2 * leftX + 'px'
        big.style.top = -2 * topY + 'px'
      }
    }
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        //max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>