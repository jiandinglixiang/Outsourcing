import { Indicator } from 'mint-ui'

export default {
  show () {
    Indicator.open({
      spinnerType: 'fading-circle'
    })
  },
  hide () {
    Indicator.close()
  }
}
