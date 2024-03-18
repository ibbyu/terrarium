import React from 'react';
import SignInCard from '../_components/sign-in-card';

export function generateMetadata() {
  return {
    title: "Sign in - Terrarium"
  };
}

const SignInPage = () => {
  return (
    <div className='flex justify-center items-center pt-32'>
      <SignInCard />
    </div>
  );
}

export default SignInPage;