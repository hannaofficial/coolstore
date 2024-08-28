import { Label } from '@/app/components/ui/label';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import {faker} from '@faker-js/faker'
import FormInput from '@/app/form/FormInput';

const createProductAction = async(formData: FormData)=>{
  'use server'
  const name = formData.get('name') as string
  console.log(name)
}

const CreateProductPage = () => {
  
  const name = faker.commerce.productName();
  const company = faker.company.name();
  const description = faker.lorem.paragraph({min:10, max:12});

  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">create product</h1>
      <div className='border p-8 rounded-md'>
        <form action={createProductAction}>
          <FormInput type='text' name='name' label='product-name' defaultValue={name}/>
          <Button>
            Submit
          </Button>
        </form>

      </div>
    </section>
  )
}

export default CreateProductPage
