interface Props {
  title: string;
}

export const Header = ({ title }: Props) => {
  return (
    <div className='bg-red-600 p-2 mb-2'>
      <h1 className="text-3xl font-bold mb-2 p-2 text-white">
        {title}
      </h1>
    </div>
  )
}