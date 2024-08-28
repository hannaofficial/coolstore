import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";

const name = 'price';

type FormatInputNumberProps = {
    defaultValue?: number;
}

function PriceInput({defaultValue}:FormatInputNumberProps){
    return (
        <div className="mb-2">
                <Label htmlFor={name} className="capitalize">Price ($)</Label>
                <Input id={name} type='number'  name={name} min={0} defaultValue={defaultValue || 100} required/>

        </div>
    )
}