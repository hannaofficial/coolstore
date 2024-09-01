import EmptyList from '@/app/components/global/EmptyList';
import { deleteProductAction, fetchAdminProducts } from '@/utils/actions';
import Link from 'next/link';

import { formatCurrency } from '@/utils/format';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/components/ui/table';
import FormContainer from '@/app/form/FormContainer';
import { IconButton } from '@/app/form/Button';

const AdminProductsPage = async() => {
  const items = await fetchAdminProducts();
  if (items.length === 0) return <EmptyList/>;

  return (
    <section>
      <Table>
        
        <TableHeader>
          <TableRow>
            <TableHead>Product Name</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item)=>{
            const {id: productId, name, company, price} = item;
            return (
              <TableRow key={productId}>
                <TableCell>
                  <Link href={`/products/${productId}`} className='underline text-muted-foreground tracking-wide capitalize'>
                      {name}
                  </Link>
                  
                </TableCell>
                <TableCell>{company}</TableCell>
                <TableCell>{formatCurrency(price)}</TableCell>
                <TableCell className='flex items-center gap-x-2'>
                <Link href={`/admin/products/${productId}/edit`}>
                    <IconButton actionType='edit'/>
                </Link>
                <DeleteProduct productId={productId}/>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
        <TableCaption className='capitalize'>
          total products: {items.length}
        </TableCaption>
      </Table>
    </section>
  )
}

function DeleteProduct({productId}:{productId:string}){
  const deleteProduct = deleteProductAction.bind(null,{productId})
  return( <FormContainer action={deleteProduct}>
      <IconButton actionType='delete'/>
  </FormContainer>)
}

export default AdminProductsPage
