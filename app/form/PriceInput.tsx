import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Prisma } from "@prisma/client";

// Prisma.ProductScalarFieldEnum.description   with this code we can access to different variable from product in prisma

const name = 'price';

type FormatInputNumberProps = {
    defaultValue?: number;
}

export function PriceInput({defaultValue}:FormatInputNumberProps){
    return (
        <div className="mb-2">
                <Label htmlFor={name} className="capitalize">Price (₹)</Label>
                <Input id={name} type='number'  name={name} min={0} defaultValue={defaultValue || 100} required/>

        </div>
    )
}