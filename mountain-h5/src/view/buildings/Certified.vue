<template>
    <div class="buildings-certified">
        <v-head hideNav="true" title="认证住户"></v-head>
      <div class="household bg-white padding-left-10" @click.stop="showDelModal" data-top="y">
        <div class="item ofh"
             v-for="(n,index) in list"
             :key="index">
          <img alt="" class="thumb fl" :src="n.uaImg">
                <div class="info fl">
                  <div class="margin-bottom-10 c-gray">姓名<span class="c-text margin-l-18">{{n.uaRealName}}</span></div>
                  <div class="c-gray">手机<span class="c-text margin-l-18">{{n.uaMobile}}</span></div>
                </div>
                <div class="fr">
                  <div class="btn btn-user" v-if="n.uaMy>0"><i class="icon user-icon"></i>您自己</div>
                  <div :data-index="index"
                       :data-uamy="n.uaMy"
                       class="btn bg-gray"
                       v-else>移除住户
                  </div>
                  <div class="c-gray">身份<span class="c-text margin-l-10">{{n.uaType|filterType}}</span></div>
                </div>
            </div>
        </div>
      <modal @close="delIndex=null"
             @rightClick="delItem"
             btnname="确定移除"
             content="您是否确定要移除住户"
             :hlight="list[delIndex||0]&&list[delIndex||0].uaRealName"
             :hidebtn="true"
             imgurl='../../assets/success.png'
             title="移除住户"
             v-show="delIndex!==null"/>
    </div>
</template>
<script>
  import VHead from '../../components/VHead.vue'
  import Modal from '../../components/Modal.vue'
  import { http } from "../../store/Http";

  export default {
    name: 'certified',
    data () {
      return {
        list: [],
        delIndex: null,
        affirm: false
      }
    },
    computed: {},
    methods: {
      showDelModal (event) {
        for (let i in event.path) {
          if (event.path[i].dataset) {
            if (event.path[i].dataset.top) break//到达捕获就结束for
            if (event.path[i].dataset.uamy) {
              if (event.path[i].dataset.uamy === '0') {
                this.delIndex = event.path[i].dataset.index
                this.affirm = true
              }
              break
            }
          }
        }
      },
      getList () {
        // 获取认证列表
        http.get('op/authHouseList.json', {
          itemId: ''
        }).then(data => {
          this.list = data.data
        })
      },
      delItem () {
        http.get('op/succeed.json', {
          itemId: '',
          uaNo: '',
          timeStamp: '',
          sign: ''
        }).then(this.getList)
        this.delIndex = null
        this.affirm = false
      }
    },
    created () {
      this.getList()
    },
    filters: {
      filterType (val) {
        //用户类型 0业主 1企业 2租户 3同住人
        switch (val * 1) {
          case 0:
            return '业主'
          case 1:
            return '企业'
          case 2:
            return '租户'
          case 3:
            return '同住人'
          default:
            return '未知'
        }
      }
    },
    components: { VHead, Modal }
  }
</script>
<style lang="scss">
    .buildings-certified {
        .vhead {
            background-color: $blue;
            color: $white;
        }

        .margin-l-18 {
            margin-left: 18px;
        }

        .margin-l-10 {
            margin-left: 10px;
        }

        .c-text {
            color: #333;
        }

        .item {
            padding: 16px 8px 17px 0;
            border-top: 1px solid #ddd;

            &:first-child {
                border-top: 0;
            }

            .thumb {
                margin-right: 10px;
                width: 55px;
                height: 55px;
                border-radius: 100%;
            }

            .btn {
                margin-bottom: 8px;
                width: 75px;
                text-align: center;
                height: 24px;
                line-height: 24px;
                border-radius: 12px;
                font-size: 13px;
            }

            .btn-user {
                background: #f94742;
            }

            .icon {
                margin-right: 5px;
                margin-bottom: 3px;
            }
        }
    }

</style>
