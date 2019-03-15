/**
 * Created by nirr on 2019/2/11.
 */
import { Toast } from 'mint-ui';

let toast = null;

export default function (message, position, duration) {
  return new Promise(function (resolve, reject) {
    if (!toast) {
      toast = Toast({
        message: message,
        position: position || 'middle'
      });
      setTimeout(() => {
        toast.close();
        toast = null;
        resolve()
      }, duration || 2000)
    }
  })
}
