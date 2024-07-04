import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { useRegisterUserWithTwitter } from "../services/queries";
import logoWhite from "../assets/logoWhite.png";
import twitterLogo from "../assets/icons/twitter.svg";
import { useEffect } from "react";


function RegisterWithTwitter() {

  const navigate = useNavigate()
  const [searchParams] = useSearchParams();
  const state = searchParams.get('state');
  const code = searchParams.get('code');

  useEffect(() => {
    if (!state && !code) {
      navigate("/register")
    }
  }, [code, navigate, state])

  const { isPending, isSuccess, isError } = useRegisterUserWithTwitter(state, code);

  const redirectUser = () => {
   setTimeout(() =>  navigate("/login"),2000)
  }
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-8  text-center">
        <div className="flex justify-center mb-20 items-center gap-5">
          <img src={twitterLogo} alt="Twiiter Logo" className=" w-24" />
          <h1 className="text-5xl text-amber-300">+</h1>
          <img src={logoWhite} alt="The Mokatils DAO logo" className="w-24" />
        </div>
        {isPending && (
          <>
            <h2 className="text-xl text-white mb-4">Sign up with <span className="font-semibold">Twitter</span> account to <span className="font-semibold">The Mokatils DAO</span></h2>
            <div className=" flex justify-center items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className='text-gray-300 text-lg'>Request has been sent...</p>
            </div>
          </>
        )}
        {isSuccess && (
          <>
          {redirectUser}
            <h2 className="text-xl text-green-500 mb-4"> - Successfully <span className=" font-semibold">Sign up</span> with your <span className=" font-semibold">Twitter</span> account!</h2>
            <p className="text-white text-base">You have been registered with Twitter. Go to to login page and sign in with Twitter.</p>
            <button className="className=' mt-3 py-2 px-7 bg-green-500 rounded text-base font-semibold'">
              <Link to={"/login"} >
                Login Page
              </Link>
            </button>
          </>
        )}

        {isError && (
          <>
            <h2 className="text-xl font-normal text-red-500 mb-4"> - Failed to <span className=" font-semibold">Sign up</span> with your <span className=" font-semibold">Twitter</span> account.</h2>
            <p className="text-white text-base">This Twitter account is already registered. Please try again with another Twitter account.</p>
            <button onClick={() => navigate(0)} className=' mt-3 py-2 px-7 bg-red-500 rounded text-base font-semibold'>
              Try Again
            </button>
          </>
        )}

      </div>
    </div>
  )
}

export default RegisterWithTwitter