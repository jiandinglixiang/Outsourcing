<template>
    <div class="modal-backdrop">
        <div class="modal bg-white">
            <div class="modal-body">
                <slot name="body">
                    <div class="img margin-bottom-10">
                        <img alt="" v-bind:src="imgurl">
                    </div>
                    <div class="tit">{{title}}</div>
                    <div class="ct">{{content}}<span class="c-red">{{hlight}}</span></div>
                </slot>
            </div>
            <div class="modal-footer">
                <slot name="footer">
                    <div class="row" v-if="!hidebtns">
                        <div @click="close" class="col btn bg-white">关闭</div>
                        <div @click="eventOpen" class="col btn c-blue btn-ok">{{btnname}}</div>
                    </div>
                    <div @click="close" class="col btn bg-white" v-if="!hidebtn">关闭</div>
                </slot>
            </div>
        </div>
    </div>
</template>
<script>
  export default {
    name: 'Modal',
    data () {
      return {
        isSuccess: true
      }
    },
    props: ['imgurl', 'title', 'content', 'hlight', 'btnname', 'hidebtns', 'hidebtn'],
    methods: {
      close () {
        this.$emit('close')
      },
      eventOpen () {
        this.$emit('rightClick')
      }
    }
  }
</script>
<style scoped lang="scss">
    .modal-backdrop {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: rgba(0, 0, 0, .3);
        display: flex;
        justify-content: center;
        align-items: center;

        .modal {
            overflow: hidden;
            width: 80%;
            border-radius: 8px;
            box-shadow: 2px 2px 20px 1px;
        }

        .modal-footer {
            border-top: 1px solid #ddd;
        }

        .modal-footer .btn {
            border-radius: 0;
            height: 50px;
            line-height: 50px;
        }

        .btn:last-child {
            border-left: 1px solid #ddd;
        }

        .modal-body {
            position: relative;
            padding: 15px 15px 0;
            height: 182px;
            text-align: center;
            font-size: 14px;
        }

        .modal-body .tit {
            margin-bottom: 15px;
            font-size: 16px;
            font-weight: bold;;
            color: #72bf4c;
        }

        .modal-body img {
            width: 60px;
            height: 60px;
        }

    }

</style>}
