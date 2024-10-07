"use client";
import React, { useEffect } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import {
  auth,
  googleProvider,
  facebookProvider,
  githubProvider,
} from "../../store/firebase";
import { useRouter } from "next/navigation";
import { Authcontext } from "@/store/AuthContext";
import Link from "next/link";
import Image from "next/image";
import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

type Props = {};

function Login({}: Props) {
  const authContext = React.useContext(Authcontext);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isempty, setisempty] = React.useState(false);
  const [errmes, seterrmes] = React.useState(false);

  const router = useRouter();

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/");
    } catch (err) {
      console.error(err);
    }
  };
  const signInWithFacebook = async () => {
    try {
      await signInWithPopup(auth, facebookProvider);
      router.push("/");
    } catch (err) {
      console.error(err);
    }
  };
  const signInWithGithub = async () => {
    try {
      await signInWithPopup(auth, githubProvider);
      router.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  const validateInputs = () => {
    if (email.trim() === "" || password.trim() === "") {
      return false;
    } else {
      return true;
    }
  };
  const signIn = async () => {
    if (validateInputs()) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        router.push("/");
      } catch (err) {
        console.error(err);
        seterrmes(true);
      }
      setisempty(false);
    }
    if (!validateInputs()) {
      setisempty(true);
      seterrmes(false);
    }
  };
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;

      authContext?.setSignin(true);
    } else {
      authContext?.setSignin(false);
    }
  });

  // useEffect(() => {
  //   console.log(authContext?.isSignin, "line 128");
  // }, [authContext?.isSignin]);
  return (
    <div className="login-container mx-auto my-[10%] w-[90%] text-white md:w-[84%]">
      {authContext?.isSignin ? (
        <h1 className="text-[28px] lg:text-[32px]">You are Logged in</h1>
      ) : (
        <div>
          {" "}
          <div className="flex flex-col lg:flex-row">
            <div className="login-container rounded-md border-[1px] border-[#262626] p-7 lg:w-[40%]">
              <h1 className="mb-[2rem] text-[28px] lg:text-[38px]">Login</h1>
              <div className="flex flex-col">
                <input
                  type="email"
                  name="email"
                  id=""
                  placeholder="Email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  className="my-2 rounded-md p-1 text-black"
                />
                <input
                  type="password"
                  name="password"
                  id=""
                  placeholder="Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      signIn();
                    }
                  }}
                  className="my-2 rounded-md p-1 text-black"
                />
                <div className="checkbox flex items-center">
                  <input type="checkbox" name="" id="" />
                  <span className="mx-1 my-2 ml-[10px] text-[12px] text-[#999999]">
                    Keep me logged in - applies to all log in options below.
                  </span>
                </div>
                {isempty && (
                  <span className="text-[12px] text-[#E50000]">
                    please fill all the fields
                  </span>
                )}
                {errmes && (
                  <span className="text-[12px] text-[#E50000]">
                    wrong email or password
                  </span>
                )}

                <button
                  className="my-2 rounded-md bg-[#E50000] p-1"
                  onClick={() => signIn()}
                >
                  Email Login
                </button>
              </div>
              <div className="social my-2 flex items-center justify-center">
                <div
                  className="google mx-1 cursor-pointer rounded-md border-[2px] border-[#262626] bg-[#1A1A1A] px-[3rem] py-[1.5rem] hover:opacity-70"
                  onClick={signInWithGoogle}
                >
                  <FaGoogle className="" />
                </div>
                <div
                  className="facebook mx-1 cursor-pointer rounded-md border-[2px] border-[#262626] bg-[#1A1A1A] px-[3rem] py-[1.5rem] hover:opacity-70"
                  onClick={signInWithFacebook}
                >
                  <FaFacebook className="" />
                </div>
                <div
                  className="github mx-1 cursor-pointer rounded-md border-[2px] border-[#262626] bg-[#1A1A1A] px-[3rem] py-[1.5rem] hover:opacity-70"
                  onClick={signInWithGithub}
                >
                  <FaGithub className="" />
                </div>
              </div>
              <div className="my-[1rem] text-[12px] text-[#999999]">
                By clicking 'Log In' you agree to our website PopcornTv Terms &
                Conditions, PopcornTv Privacy Notice and Terms & Conditions.
              </div>
            </div>
            <div className="register-container my-4 flex flex-col rounded-md border-[1px] border-[#262626] p-7 lg:mx-4 lg:my-0">
              <h1 className="text-[28px]">
                Join PopcornTv Club Get Rewarded Today.
              </h1>
              <p className="text-[14px] text-[#999999] lg:text-[18px]">
                As PopcornTv club member you get rewarded with what you love for
                doing what you love. Sign up today and receive immediate access
                to these Level 1 benefits:
              </p>
              <ul
                style={{ listStyleType: "disc", paddingLeft: "20px" }}
                className="my-[1rem]"
              >
                <li className="text-[11px] text-[#999999]">Free Exclusives</li>
                <li className="text-[11px] text-[#999999]">
                  A 15% off voucher for your next purchase​
                </li>
                <li className="text-[11px] text-[#999999]">
                  Access to Members Only shows and sales​
                </li>
                <li className="text-[11px] text-[#999999]">
                  Access to all our cooperative apps​
                </li>
                <li className="text-[11px] text-[#999999]">
                  Special offers and promotions​
                </li>
              </ul>

              <p className="text-[14px] text-[#999999] lg:text-[18px]">
                Join now to start earning points, reach new levels and unlock
                more rewards and benefits from PopcornClub.​
              </p>
              <Link href={"/register"} className="mx-auto w-[90%] self-center">
                <button className="mx-auto my-[1rem] w-[100%] rounded-md bg-[#E50000] px-4 py-2">
                  Join the club
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
