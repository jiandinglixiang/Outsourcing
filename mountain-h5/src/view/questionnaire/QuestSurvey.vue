<template>
    <div class="questionnaire-questsurvey">
        <v-head title="问卷调查"></v-head>
        <sift-nav></sift-nav>
        <div class="item-list">
            <div @click="goAnswer" class="margin-bottom-10 bg-white">
                <div class="content">
                    <div class="margin-bottom-10 ofh">
                        <div class="fl text-ml">11月社区物业满意度调查</div>
                        <div class="fr text-sm c-red">积分: 100</div>
                    </div>
                    <div class="text-normal c-gray">提交问卷调查可获得100积分,点击答题</div>
                </div>
                <div class="meta ofh padding-auto-10">
                    <div class="fl text-normal c-gray">题数:10</div>
                    <div class="fr text-normal c-gray">截止日期:2018-11-11</div>
                </div>
            </div>
            <div @click="goAnswer" class="margin-bottom-10 bg-white">
                <div class="content">
                    <div class="margin-bottom-10 ofh">
                        <div class="fl text-ml">11月社区物业满意度调查</div>
                        <div class="fr text-sm c-red">积分: 100</div>
                    </div>
                    <div class="text-normal c-gray">提交问卷调查可获得100积分,点击答题</div>
                </div>
                <div class="meta ofh padding-auto-10">
                    <div class="fl text-normal c-gray">题数:10</div>
                    <div class="fr text-normal c-gray">截止日期:2018-11-11</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  import VHead from '../../components/VHead.vue'
  import SiftNav from '../../components/SiftNav.vue'

  export default {
    name: 'questsurvey',
    data () {
      return {}
    },
    computed: {},
    methods: {
      goAnswer () {
        this.$router.push({
          name: 'Question',
          // params: {id: id}
        })
      }
    },
    created () {
    },
    components: { VHead, SiftNav }
  }
</script>
<style lang="scss">
    .questionnaire-questsurvey {
        .vhead {
            background-color: $blue;
            color: $white;
        }

        .item-list {
            .content {
                padding: 10px;
            }

            .meta {
                height: 35px;
                line-height: 35px;
                border-top: 1px solid #ddd;
            }
        }

        .padding-auto-10 {
            padding: 0 10px;
        }
    }
</style>
