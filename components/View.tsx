import React from 'react'
import Ping from './Ping'
import { client } from '@/sanity/lib/client'
import { STARTUP_VIEWS_QUERY } from '@/sanity/lib/queries';
import { writeClient } from '@/sanity/lib/write_client';
import { after } from 'next/server'

const View = async ({id} : {id: string}) => {

    const { views: totalViews } = await client.withConfig({useCdn: false}).fetch(STARTUP_VIEWS_QUERY, {id});

    after(async() => await writeClient
      .patch(id)
      .set({views: totalViews + 1})
      .commit()
    )

  return (
    <div className='fixed bottom-4 right-4 bg-teal-50 shadow-lg rounded-full px-4 py-2 flex items-center space-x-2 z-50'>
        <div className='absolute -top-2 -right-2'>
            <Ping />
        </div>
        <p>
            <span className='font-bold'>Views: {totalViews}</span>
        </p>
    </div>
  )
}

export default View