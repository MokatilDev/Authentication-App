import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { ServerResponse } from "../types/serverResponse";
import logo from "../assets/logo.png"
import { useGetUser } from "../services/queries";
import { useLogoutUser } from "../services/mutations";
import { Link, useNavigate } from "react-router-dom";

interface authProvider {
  provider: "local" | "discord" | "twitter",
  providerId: string
}

interface UserData {
  username: string,
  displayName: string,
  email: string,
  role: string,
  verified: boolean,
  authProviders: authProvider[],
  createdAt: Date,
  updatedAt: Date
}


function Home() {
  const [user, setUser] = useState<UserData>()
  const navigate = useNavigate()

  const { data: userInfo, isSuccess, isPending, isError } = useGetUser()

  useEffect(() => {
    if (isSuccess && userInfo.data) {
      setUser(userInfo.data)
    }
  }, [isSuccess, userInfo])

  const logoutUser = useLogoutUser()

  const logoutUserFn = () => {
    logoutUser.mutate()
    setUser(undefined);
    navigate("/login")
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center py-5 px-5">
      
      {isSuccess && (
        <div className=" flex flex-col justify-center items-center">
          <img src={logo} alt="The Mokatils DAO" className="w-24 mx-auto mb-5 absolute top-7" />
          <h1 className="font-bold text-3xl text-center">Welcome <span className="text-amber-300">{user?.displayName}</span> to The Mokatils DAO</h1>
          <p className=" text-gary-200 text-base mt-1 text-center">
            This Website made by Mokatil Dev
          </p>

          <button className=" bg-red-500 gap-2  font-semiblod py-2 px-6  rounded mt-5 mb-2 text-base" onClick={logoutUserFn}>
            logout
          </button>

        </div>
      )}

      {isPending && (
        <div className=" flex justify-center items-center">
          <svg className="animate-spin -ml-1 mr-3 h-10 w-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      )}
      
      {isError && (
        <div className=" flex flex-col justify-center items-center">
          <img src={logo} alt="The Mokatils DAO" className="w-24 mx-auto mb-5 absolute top-7" />
          <h1 className="font-bold text-3xl text-center">Please login with your account</h1>
          <p className=" text-gary-200 text-base mt-1 text-center">
            This Website made by Mokatil Dev
          </p>

          <Link to={"/login"} className=" bg-amber-300 text-black gap-2 font-blod py-2 px-6 rounded mt-5 mb-2 text-base">
            login
          </Link>

        </div>
      )}

    </div>
  )
}

export default Home