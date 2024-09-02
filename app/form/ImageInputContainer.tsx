'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Button } from '../components/ui/button';
import FormContainer from './FormContainer';
import ImageInput from './ImageInput';
import { SubmitButton } from './Button';
import { type actionFunction } from '@/utils/types';

type ImageInputContainerProps = {
    image:string;
    name: string;
    action: actionFunction;
    text: string;
    children?:React.ReactNode;
}

export function ImageInputContainer(props:ImageInputContainerProps){
    const {image,name,action,text} = props
    const [isUpdateformVisible, setUpdateFormVisible] = useState(false);
    return <div className='mb-8'>
        <Image src={image} width={200} height={200} className='rounded object-cover mb-4 w-[200px] h-[200px]' alt={name}/>
        <Button variant='outline' size='sm' onClick={()=> setUpdateFormVisible((prev)=> !prev)}>{text}</Button>
        {isUpdateformVisible && (
            <div className='max-w-md mt-4'>
                <FormContainer action={action}>
                    {props.children}
                    <ImageInput/>
                    <SubmitButton size='sm' text={text}/>

                </FormContainer>

            </div>
        )}
    </div>
}