import { fetchAdminProductDetails, updateProductAction, updateProductImageAction } from '@/utils/actions';
import FormContainer from '@/app/form/FormContainer';
import FormInput from '@/app/form/FormInput';
import { PriceInput } from '@/app/form/PriceInput';
import TextAreaInput from '@/app/form/TextAreaInput';
import { SubmitButton } from '@/app/form/Button';
import CheckboxInput from '@/app/form/Checkboxinput';
import { ImageInputContainer } from '@/app/form/ImageInputContainer';

const EditProductPage = async({params}:{params:{id:string}})=>{
  const {id} = params;
  const product = await fetchAdminProductDetails(id);
  const {name,company, description, featured, price} = product;
  return <section>
      <h1 className='text-2xl font-semibold mb-8 capitalize'>update product</h1>
      <div className='border p-8 rounded'>
        {/* IMAGE INPUT CONTAINER */}
        <ImageInputContainer action={updateProductImageAction} name={name} image={product.image} text='update image'>
            <input type="hidden" name="id" value={id} />
            <input type="hidden" name="url" value={product.image} />
        </ImageInputContainer>
        {/* FORM CONTAINEr */}
        <FormContainer action={updateProductAction}>
          <div className='grid gap-4 md:grid-cols-2 my-4'>
            <input type='hidden' name='id' value={id} />
            <FormInput
              type='text'
              name='name'
              label='product name'
              defaultValue={name}
            />
            <FormInput
              type='text'
              name='company'
              label='company'
              defaultValue={company}
            />

            <PriceInput defaultValue={price} />
          </div>
          <TextAreaInput
            name='description'
            labelText='product description'
            defaultValue={description}
          />
          <div className='mt-6'>
            <CheckboxInput
              name='featured'
              label='featured'
              defaultChecked={featured}
            />
          </div>
          <SubmitButton text='update product' className='mt-8' />
        </FormContainer>

      </div>
  </section>
}

export default EditProductPage;
