import { cn, formatDate } from '@/lib/utils'
import { EyeIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { Statup, Author } from '@/sanity.types'
import { Skeleton } from './ui/skeleton'

export type StartupTypeCard = Omit<Statup, "author"> & {author?: Author};

const StartupCard = ({post}: {post: StartupTypeCard}) => {

const {
  _createdAt,
  views,
  author,
  title,
  description,
  category,
  _id,
  image,
} = post;



  return (
    <li className='startup-card group max-w-xl'>
        <div className='flex-between'>
            <p className='startup_card_date'>
                {formatDate(_createdAt)}
            </p>
            <div className='flex gap-1.5'>
                <EyeIcon className='size-6 text-primary' />
                <span className='font-medium'>{views}</span>
            </div>
        </div>

        <div className='flex-between mt-5 gap-5'>
            <div className='flex-1'>
                <Link href={`/user/${author?._id}`}>
                    <p className='text-16-medium'>
                        {author?.name}
                    </p>
                </Link>
                <Link href={`/startup/${_id}`}>
                    <h3 className='text-3xl font-semibold line-clamp-1'>
                        {title}
                    </h3>
                </Link> 
            </div>
            <Link href={`/user/${author?._id}`}>
                <Image src={author?.image!} alt={author?.name!} width={48} height={48} className='rounded-full' />
            </Link>
        </div>
        <Link href={`/startup/${_id}`}>
            <p className='startup-card_desc'>
                {description}
            </p>

            <img src={image} alt="placeholder" className='startup-card_img' />
        </Link>

        <div className='flex-between gap-3 mt-5'>
            <Link href={`/?query=${category?.toLowerCase()}`}>
                <p className='text-xl font-medium'>{category}</p>
            </Link>
            <Button className='startup-card_btn' asChild>
                <Link href={`/startup/${_id}`}>
                    Details
                </Link>
            </Button>
        </div>
    </li>
  )
}

export const StartupCardSkeleton = () => (
  <>
    {[0, 1, 2, 3, 4].map((index: number) => (
      <li key={index} className="skeleton">
        <Skeleton className="w-full max-w-md h-80 rounded-2xl bg-muted/30 border border-border shadow-sm animate-pulse" />
      </li>
    ))}
  </>
);


export default StartupCard