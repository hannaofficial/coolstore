'use client'
import { Checkbox } from '@/app/components/ui/checkbox';

type CheckboxInputProps = {
  name: string;
  label: string;
  defaultChecked?: boolean;
};

export default function CheckboxInput({
  name,
  label,
  defaultChecked = false,
}: CheckboxInputProps) {
  return (
    <div className='flex items-center space-x-2'>
      <Checkbox id={name} name={name} defaultChecked={defaultChecked} />
      <label
        htmlFor={name}
        className='text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize'
      >
        {label}
      </label> {/* if peer(button or checkbox is )disable toh agar kisi jusre peer pe peer-disable likke koi css likha toh woh css effect hoga when peer is disable */}
    </div>
  );
}