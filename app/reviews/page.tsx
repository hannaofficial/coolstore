import { deleteReviewAction, fetchProductReviewsByUser } from '@/utils/actions';
import ReviewCard from '@/app/components/reviews/ReviewCard';
import SectionTitle from '@/app/components/global/SectionTitle';
import FormContainer from '@/app/form/FormContainer';
import { IconButton } from '@/app/form/Button';
import { actionFunction } from '@/utils/types';

const Reviews = async() => {

  const reviews = await fetchProductReviewsByUser()
  if(reviews.length === 0){
    return <SectionTitle text='you have no reviews yet'/>
  }

  return (
    <div>
      <SectionTitle text='Your reviews'/>
      <section className='grid md:grid-cols-2 gap-8 mt-4 '>
        {reviews.map((review) => {
          const { comment, rating } = review;
          const { name, image } = review.product;
          const reviewInfo = {
            comment,
            rating,
            name,
            image,
          };
          return (
            <ReviewCard key={review.id} reviewInfo={reviewInfo}>
              <DeleteReview reviewId={review.id} />
            </ReviewCard>
          );
        })}
      </section>
    </div>
  )
}


const DeleteReview = ({ reviewId }: { reviewId: string }) => {
  const deleteReview = deleteReviewAction.bind(null, { reviewId }) as actionFunction;
  return (
    <FormContainer action={deleteReview}>
      <IconButton actionType='delete' />
    </FormContainer>
  );
};

export default Reviews
