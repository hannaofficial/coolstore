'use server'
import db from '@/utils/db'
import { auth, currentUser } from '@clerk/nextjs/server';
// import { error } from 'console';
import { redirect } from 'next/navigation';
// import { promises as fs } from 'fs';
// import path from 'path';
import { imageSchema, productSchema, reviewSchema, validateWithZodSchema } from './schemas';
import { deleteImage, uploadImage } from './supabase';
import { revalidatePath } from 'next/cache';
import Reviews from '@/app/reviews/page';



const getAuthUser = async()=>{
    const user = await currentUser();
    if (!user) redirect('/');
    return user;
}

const getAdminUser = async ()=>{
    const user = await getAuthUser();
    if(user.id !== process.env.ADMIN_USER_ID) redirect('/') ;
    return user; 
}

const renderError = (error:unknown):{message: string} =>{
    console.log(error)
        return {message: error instanceof Error? error.message:  'There was some error..',} 
}

export const fetchFeaturedProducts = async()=>{
    const products = await db.product.findMany({
        where:{
            featured:true,
        },
    });
    return products;
}

export const fetchAllProducts = async({search=''}: {search: string})=>{
    return db.product.findMany({
        where:{
            OR:[
                    {name:{contains: search, mode:'insensitive'}},
                    {company: {contains: search, mode: 'insensitive'}}
            ],
        },
        orderBy:{
            createdAt: 'desc'
        },
    })
}

export const fetchSingleProduct = async(productId:string)=>{
    const product = await db.product.findUnique({
        where:{
            id:productId,
        },
    });
    if (!product) return redirect('/products');
    return product
}

export const createProductAction = async(prevState:any, formData: FormData):Promise<{message:string}> =>{
    const user = await getAuthUser();

    try {

        const rawData = Object.fromEntries(formData)
        const file = formData.get('image') as File;

        // const validateField = productSchema.parse(rawData)
        // const validateField = productSchema.safeParse(rawData)
        const validateFields = validateWithZodSchema(productSchema,rawData)
        const validateFile = validateWithZodSchema(imageSchema,{image:file})
        console.log(file)
        const fullPath = await uploadImage(validateFile.image)
        console.log({fullPath: fullPath})

        // const image = formData.get('image') as File;
        // // const featured = Boolean(formData.get('featured') as string);

        // let imagePath = '/images/default-image.jpg';

        // if (image && image instanceof File) {
        //     const imageDir = path.join(process.cwd(), 'public/images');
        //     await fs.mkdir(imageDir, { recursive: true });

        //     const imageName = `${Date.now()}-${image.name}`;
        //     const fullImagePath = path.join(imageDir, imageName);

            
        //     const imageBuffer = await image.arrayBuffer();
        //     await fs.writeFile(fullImagePath, Buffer.from(imageBuffer));

        //     imagePath = `/images/${imageName}`;
        // }

        // // Store the image path and other data in the database
        // console.log('Image Name:', image.name);
        // console.log('Image Path:', imagePath);
        await db.product.create({
            data:{
                ...validateFields,
                image:fullPath,
                clerkId:user.id,
            }
        })



        // await db.product.create({
        //     data: {
        //         name,
        //         company,
        //         price,
        //         image: imagePath,
        //         description,
        //         featured,
        //         clerkId: user.id,
        //     },
        // });
        // return {message:'product created'} 
    } catch (error) {
        return renderError(error)
    }

    redirect('/admin/products')
}


export const fetchAdminProducts = async () =>{
    await getAdminUser();
    const products = await db.product.findMany({
        orderBy:{
            createdAt:'desc',
        }
    });
    return products;
}


export const deleteProductAction = async(prevState:{productId: string}) =>{
    const {productId} = prevState;
    await getAdminUser();
    try {
       const product =  await db.product.delete({
            where:{
                id: productId,
            }
        });
        await deleteImage(product.image)
        revalidatePath('/admin/products');
        return {message: 'product removed'}
    } catch (error) {
        return renderError(error)
        
    }
}

export const fetchAdminProductDetails = async(productId: string)=>{
    await getAdminUser();
    const product = await db.product.findUnique({
        where:{
            id:productId,
        }
    });
    if(!product) redirect('/admin/products');
    return product;
}

export const updateProductAction = async (
    prevState: any,
    formData: FormData
  ) => {
    await getAdminUser();
    try {
      const productId = formData.get('id') as string;
      const rawData = Object.fromEntries(formData);
  
      const validatedFields = validateWithZodSchema(productSchema, rawData);
  
      await db.product.update({
        where: {
          id: productId,
        },
        data: {
          ...validatedFields,
        },
      });
      revalidatePath(`/admin/products/${productId}/edit`);
      return { message: 'Product updated successfully' };
      
    } catch (error) {
      return renderError(error);
    }
    
    
  };

export const updateProductImageAction = async(prevState:any, formData:FormData)=>{
    await getAuthUser()
    try {
        const image = formData.get('image') as File;
        const productId = formData.get('id') as string;
        const oldImageUrl = formData.get('url') as string;

        const validatedFile = validateWithZodSchema(imageSchema,{image});
        const fullPath = await uploadImage(validatedFile.image)
        await deleteImage(oldImageUrl)
        await db.product.update({
            where: {
                id: productId,
            },
            data:{
                image: fullPath,
            }
        });
        revalidatePath(`/admin/products/${productId}/edit`);
        return {message:'Product Image updated Successfully'};
    } catch (error) {
       return renderError(error) 
    }
}

export const fetchFavoriteId = async({productId}:{productId: string})=>{

  const user = await getAuthUser();
  const favorite = await db.favorite.findFirst({
    where:{
        productId,
        clerkId: user.id,
    },
    select:{
        id:true,
    }
  });

  return favorite?.id || null;

}

export const fetchFavorites = async ()=>{
    
    try {
        const user = await getAuthUser();
        const favorites = await db.favorite.findMany({
          where: {
            clerkId: user.id,
          },
          include: {
            product: true,
          }
        });
        return favorites;
      } catch (error) {
        console.error('Error fetching favorites:', error);
        throw error;  
      }
}

export const toggleFavoriteAction = async(prevState:{productId: string; favoriteId: string | null; pathname: string;})=>{
    
    const user = await getAuthUser();
    const {productId, favoriteId, pathname} = prevState;
    try {
        if(favoriteId){
            await db.favorite.delete({
                where:{
                    id: favoriteId,
                }
            })
        }else{
            await db.favorite.create({
                data:{
                    productId,
                    clerkId: user.id,
                }
            })
        }
        revalidatePath(pathname)
        return {message: favoriteId? 'remove from favorite':'Added to Favorites'}
    } catch (error) {
        return renderError(error)
    }
}


// Reviews

export const createReviewAction = async (
    prevState: any,
    formData: FormData
  ) => {
    const user = await getAuthUser();
    try {
      const rawData = Object.fromEntries(formData);
    //   const file = formData.get('image') as File;
  
      const validatedFields = validateWithZodSchema(reviewSchema, rawData);
      const imageUrl = formData.get('authorImageUrl') as string
  
      await db.review.create({
        data: {
          ...validatedFields,
          clerkId: user.id, authorImageUrl: imageUrl
        },
      });
      revalidatePath(`/products/${validatedFields.productId}`);
      return { message: 'Review submitted successfully' };
    } catch (error) {
      return renderError(error);
    }
  };

export const fetchProductReviews = async (productId: string) =>{
    const reviews = await db.review.findMany({
        where:{
            productId

        },
        orderBy:{
            createdAt: 'desc'
        }
    });
    return reviews
};
export const fetchProductRating = async (productId: string) =>{
    const result = await db.review.groupBy({
        by: ['productId'],
        _avg:{
            rating: true,
        },
        _count:{
            rating: true,
        },
        where:{
            productId,
        }
    });
    return{

        rating: result[0]?._avg.rating?.toFixed(1) ?? 0,
        count: result[0]?._count.rating ?? 0,
    }
};
export const fetchProductReviewsByUser = async () =>{
    
    const user = await getAuthUser();
    const reviews = await db.review.findMany({
        where:{
            clerkId: user.id,
        },
        select:{
            id:true,
            rating: true,
            comment: true,
            product:{
                select:{
                    image: true,
                    name: true,
                }
            }
        }
    });
    return reviews
};
export const deleteReviewAction = async (prevState:{reviewId: string}) =>{
    const {reviewId} = prevState
    const user = await getAuthUser()
    try {
        await db.review.delete({
            where:{
                id: reviewId,
                clerkId: user.id,
            },
        });
        revalidatePath('/reviews')
        return { message: 'Deleted successfully' };
    } catch (error) {

        return renderError(error)
        
    }

};
export const findExistingReview = async (userId: string, productId: string) =>{
    return db.review.findFirst({
        where:{
            clerkId: userId,
            productId,
        }
    })
};



//  action for cart
import { Cart } from '@prisma/client';

export const fetchCartItems = async () => {
    const {userId} = auth()

    const cart = await db.cart.findFirst({
        where:{
            clerkId: userId ?? ''
        },
        select:{
            numItemsInCart: true,
        }
    });
    return cart?.numItemsInCart || 0;
};

const fetchProduct = async (productId: string) => {
    const product = await db.product.findUnique({
      where: {
        id: productId,
      },
    });
  
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  };
  const includeProductClause = {
    cartItems: {
      include: {
        product: true,
      },
    },
  };

 
  
  export const fetchOrCreateCart = async ({
    userId,
    errorOnFailure = false,
  }: {
    userId: string;
    errorOnFailure?: boolean;
  }) => {
    let cart = await db.cart.findFirst({
      where: {
        clerkId: userId,
      },
      include: includeProductClause,
    });
  
    if (!cart && errorOnFailure) {
      throw new Error('Cart not found');
    }
  
    if (!cart) {
      cart = await db.cart.create({
        data: {
          clerkId: userId,
        },
        include: includeProductClause,
      });
    }
  
    return cart;
  };
  

  const updateOrCreateCartItem = async ({
    productId,
    cartId,
    amount,
  }: {
    productId: string;
    cartId: string;
    amount: number;
  }) => {
    let cartItem = await db.cartItem.findFirst({
      where: {
        productId,
        cartId,
      },
    });
  
    if (cartItem) {
      cartItem = await db.cartItem.update({
        where: {
          id: cartItem.id,
        },
        data: {
          amount: cartItem.amount + amount,
        },
      });
    } else {
      cartItem = await db.cartItem.create({
        data: { amount, productId, cartId },
      });
    }
  };
  

  export const updateCart = async (cart: Cart) => {
    const cartItems = await db.cartItem.findMany({
      where: {
        cartId: cart.id,
      },
      include: {
        product: true, // Include the related product
      },
    });
  
    let numItemsInCart = 0;
    let cartTotal = 0;
  
    for (const item of cartItems) {
      numItemsInCart += item.amount;
      cartTotal += item.amount * item.product.price;
    }
    const tax = cart.taxRate * cartTotal;
    const shipping = cartTotal ? cart.shipping : 0;
    const orderTotal = cartTotal + tax + shipping;
  
    const currentCart = await db.cart.update({
      where: {
        id: cart.id,
      },
      data: {
        numItemsInCart,
        cartTotal,
        tax,
        orderTotal,
      },
      include:includeProductClause
    });
    return currentCart
  };
  

export const addToCartAction = async (prevState:any, formData: FormData) => {
    
    
    const user = await getAuthUser()
    try {
        const productId = formData.get('productId') as string;
        const amount = Number(formData.get('amount'));
        await fetchProduct(productId);
        const cart = await fetchOrCreateCart({ userId: user.id });
        await updateOrCreateCartItem({ productId, cartId: cart.id, amount });
        await updateCart(cart);
      } catch (error) {
        return renderError(error);
      }
      redirect('/cart');


}
    ;

export const removeCartItemAction = async () => {};

export const updateCartItemAction = async () => {};