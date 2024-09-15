
import { Separator } from "../ui/separator"

const SectionTitle = ({text,className}:{text:String, className?:string}) => {
  return (
    <div>
      <h2 className={`text-2xl font-medium tracking-wider capitalize mb-8`}>
        {text}
      </h2>
      <Separator/>
    </div>
  )
}

export default SectionTitle
