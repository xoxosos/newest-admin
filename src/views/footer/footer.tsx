export interface Props {
  title: string
  color?: string
}

const Footer = (props: Props) => {
  return (
    <div>
      <h1 style={{ color: props.color ? props.color : 'red' }}>
        {props.title}
      </h1>
    </div>
  )
}
