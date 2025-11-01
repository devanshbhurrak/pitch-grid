import { auth } from '@/auth';
import { StartupCardSkeleton } from '@/components/StartupCard';
import UserStartups from '@/components/UserStartups';
import { client } from '@/sanity/lib/client';
import { AUTHOR_BY_ID_QUERY } from '@/sanity/lib/queries';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react';

export const experimental_ppr = true;

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const session = await auth();

  const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id });

  if (!user) return notFound();

  return (
    <section className="flex flex-col gap-10 p-6 lg:p-12 max-w-6xl mx-auto">
      {/* Profile Card */}
      <div className="flex flex-col mx-auto items-center bg-muted/20 border shadow-md shadow-teal-500 rounded-2xl p-6 w-full max-w-3xl">
        <h3 className="text-4xl font-black text-center line-clamp-1">{user.name}</h3>

        <Image
          src={user.image}
          alt={user.name}
          width={220}
          height={220}
          className="rounded-full mt-5 object-cover"
        />

        <p className="text-2xl font-extrabold mt-6 text-center">@{user.username}</p>
        <p className="mt-2 text-center text-sm font-normal text-muted-foreground">{user?.bio}</p>
      </div>

      {/* User Startups */}
      <div className="flex-1 flex flex-col gap-5">
        <p className="text-2xl lg:text-3xl font-bold">
          {session?.id === id ? 'Your' : 'All'} Startups
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Suspense fallback={<StartupCardSkeleton />}>
            <UserStartups id={id} />
          </Suspense>
        </ul>
      </div>
    </section>
  );
};

export default page;
