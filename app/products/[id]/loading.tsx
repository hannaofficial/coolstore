'use client'

import { Card, CardContent } from '@/app/components/ui/card'
import { Skeleton } from '@/app/components/ui/skeleton'
import React from 'react'

const Loading = () => {
  return (
    <div>
      <LoadingProduct/>
    </div>
  )
}

export default Loading

function LoadingProduct(){
    return(
        <div className="flex justify-center items-center mx-auto">

      <Card>
        <CardContent className='p-4'>
            <div className="flex gap-8">
              <Skeleton className='h-84 w-full'/>
              <div className="grid gap-3">
                <Skeleton className='h-4 w-3/4 mt-4'/>
                <Skeleton className='h-4 w-1/2 mt-4'/>
              </div>

            </div>
          
        </CardContent>
      </Card>
        </div>
    )
  }
