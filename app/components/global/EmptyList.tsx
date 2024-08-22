import React from 'react'
import {cn} from '@/lib/utils'

const EmptyList = ({heading="No items found.",className}:{heading?:String,className?:String}) => {
  return (
    <>
      <h2 className={cn('text-xl',className)}>{heading}</h2>
    </>
  )
}

export default EmptyList
