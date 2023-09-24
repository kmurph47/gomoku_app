import style from './Message.module.css'

type MessageProps = {
    variant: 'error'
    message: string
  }
  
  export default function Message({ variant, message }: MessageProps) {
    return <div className={`${style.message} ${style[variant]}`}>{message}</div>
  }
  