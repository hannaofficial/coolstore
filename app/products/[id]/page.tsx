import BreadCrumbs from '../../components/singleProduct/BreadCrumbs';
import { fetchSingleProduct , findExistingReview} from '../../../utils/actions';
import Image from 'next/image';
import { formatCurrency } from '../../../utils/format';
import FavoriteToggleButton from '../../components/products/FavoriteToggleButton';
import AddToCart from '../../components/singleProduct/AddToCart';
import ProductRating from '../../components/singleProduct/ProductRating';
import { ShareButton } from '@/app/components/singleProduct/ShareButton';

import SubmitReview from '@/app/components/reviews/SubmitReview';
import ProductReviews from '@/app/components/reviews/ProductReviews';
import {auth} from '@clerk/nextjs/server'
import SectionTitle from '@/app/components/global/SectionTitle';


const SingleProductPage = async({params}:{params:{id:string}}) => {
  const product = await fetchSingleProduct(params.id);
  const {name, image, company, description, price} = product;
  const dollarsAmount = formatCurrency(price);

  const {userId} = auth();
  const reviewDoesNotExist = userId && !(await findExistingReview(userId, product.id))

  return (
    <section>
      <BreadCrumbs name={name}/>
      <div className='mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16 '>
        {/* IMAGE FIRST COL */}
        <div className='relative h-full'>
          <Image src={image} alt={name} fill sizes='(max-width:768px) 100vw, (max-width:1200) 50vw, 33vw' priority className='w-full  rounded-md object-cover' />
        </div>
        {/* PRODUCT INFO SECOND COL */}
        <div>
          <div className='flex gap-x-8 items-center'>
              <h1 className='capitalize text-3xl font-bold'>{name}</h1>
              <div className='flex gap-x-2 items-center'>

                <FavoriteToggleButton productId={params.id}/>
                <ShareButton name={product.name} productId={params.id}/>
              </div>
          </div>
          <ProductRating productId={params.id}/>
          <h4 className='text-xl mt-2'>{company}</h4>
          <p className='mt-3 text-md bg-muted inline-block p-2 rounded-md'>{dollarsAmount}</p>
          <p className='mt-6 leading-8 text-muted-foreground'>{description}</p>
          <AddToCart productId={params.id}/>
        </div>
      </div>
      <div className='mt-12'>

      <SectionTitle  text='Product review'  />
      </div>
      <ProductReviews productId={params.id}/>
      {
        reviewDoesNotExist &&
      <SubmitReview productId={params.id}/>
      }
    </section>
  )
}

export default SingleProductPage
