import { message } from 'ant-design-vue'

export const useMessage = () => {
  message.config({
    duration: 2
  })

  const httpMessage = (code: number, msg: string, duration: number = 2) => {
    if (msg === '') return
    switch (code) {
      case 200:
        message.success(msg, duration)
        break
      default:
        message.error(msg, duration)
    }
  }

  return { httpMessage, message }
}
