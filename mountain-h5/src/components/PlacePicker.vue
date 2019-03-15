<template>
  <div>
    <div :style="PlaceValue ? '':{color: '#999'}"
         style="height: 42px; line-height: 42px;overflow: hidden;font-size: 14px"
    >
      {{PlaceValue||placeholder}}
    </div>
    <mt-popup
      position="bottom"
      style="width: 100%;max-width: 640px"
      closeOnClickModal=""
      v-model="Visible">
      <mt-picker :showToolbar="showToolbar" :slots="PlaceData" :value-key="KeyName||'name'" @change="onValuesChange">
        <div class="place-button">
          <div @click.stop="Visible=false">取消</div>
          <div @click.stop="setPlaceValue">确认</div>
        </div>
      </mt-picker>
    </mt-popup>
  </div>
</template>

<script>//
import { Picker, Popup } from 'mint-ui'

export default {
  name: 'PlacePicker',
  props: {
    PlaceValue: String,
    PlaceData: Array,
    placeholder: String,
    popupVisible: Boolean,
    KeyName: String
  },
  data () {
    return {
      showToolbar: true,
      Visible: false,
      middleware: false
    }
  },
  methods: {
    onValuesChange (picker, values) {
      this.setPlaceValue = () => {
        this.$emit('changeValue', { picker, values })
      }
    },
    setPlaceValue () {}
  },
  watch: {
    Visible (ew) {
      ew !== this.middleware && (this.middleware = ew)
    },
    middleware (ew) {
      ew !== this.Visible && (this.Visible = ew)
      ew !== this.popupVisible && (this.$emit('update:popupVisible', ew))
    },
    popupVisible (ew) {
      ew !== this.middleware && (this.middleware = ew)
    }
  },
  components: {
    [Picker.name]: Picker,
    [Popup.name]: Popup
  }
}
</script>

<style scoped lang="scss">
  .place-button {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    line-height: 40px;
    border-bottom: 1px solid #eaeaea;

    div {
      flex: 1 1;
      text-align: center;
      font-size: 16px;
      color: #26a2ff;
    }

  }
</style>
