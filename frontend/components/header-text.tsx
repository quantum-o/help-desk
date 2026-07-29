type Props = {
    title: string;
    description: string;
}

const HeaderText = ({ title, description }: Props) => {
  return (
    <div className="w-full flex flex-col gap-2">
        <h3>{title}</h3>
        <h6>{description}</h6>
    </div>
  )
}

export default HeaderText