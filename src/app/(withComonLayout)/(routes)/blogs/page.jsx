import BlogPost from '@/components/Blogs/BlogPost';
import React from 'react';

const Page = () => {
    console.log("process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY",process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
    return (
        <div>
            <BlogPost></BlogPost>
        </div>
    );
};

export default Page;