"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import {
  auth,
  googleProvider,
  facebookProvider,
  githubProvider,
} from "../../store/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Authcontext } from "@/store/AuthContext";

type Props = {};

const Register = (props: Props) => {
  const authContext = React.useContext(Authcontext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [userHasAccount, setuserhasaccount] = useState(false);
  const [isempty, setisempty] = useState(false);
  const [errmes, seterrmes] = React.useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

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
    if (
      firstName.trim() === "" ||
      lastName.trim() === "" ||
      email.trim() === "" ||
      password.trim() === ""
    ) {
      return false;
    } else {
      return true;
    }
  };
  const signUp = async () => {
    const user = auth.currentUser;
    if (checkboxChecked && validateInputs()) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        router.push("/");
        setuserhasaccount(true);
      } catch (err) {
        console.error((err as any).message);
        if ((err as any).message.includes("email-already-in-use")) {
          setuserhasaccount(true);
          seterrmes(false);
        } else if ((err as any).message.includes("invalid-email")) {
          setuserhasaccount(false);
          seterrmes(true);
        }
      }
      setisempty(false);
    }
    if (!validateInputs()) {
      setisempty(true);
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


  return (
    <div className="register-page mx-auto my-[10%] w-[90%] text-white md:w-[84%]">
      {authContext?.isSignin ? (
        <h1 className="text-[28px] lg:text-[32px]">You are Logged in</h1>
      ) : (
        <div className="flex flex-col lg:flex-row">
          <div className="left-sec lg:mr-9">
            <h3 className="mb-2 text-[24px] text-white md:text-[28px] lg:text-[34px]">
              Welcome to our family page!
            </h3>
            <p className="mb-3 text-[14px] text-[#999999] md:text-[16px] lg:text-[18px]">
              We are here to make you have the best experience
            </p>
            <Image
              src={"/images/support-img.png"}
              width={500}
              height={500}
              alt=""
              className="border-[2px] border-[#1A1A1A] object-cover"
            />
          </div>
          <div className="right-sec my-4 flex flex-col rounded-md border-[1px] border-[#262626] p-7 lg:my-0 lg:w-[40%]">
            <h1 className="mb-[2rem] text-[28px] lg:text-[38px]">Register</h1>
            <p className="my-3">Sign up with</p>
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
            <p className="my-3">OR</p>
            <h2>Your Name</h2>
            <input
              type="text"
              name="fname"
              id=""
              placeholder="First Name"
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              className="my-2 rounded-md p-1 text-black"
            />
            <input
              type="text"
              name="lname"
              id=""
              placeholder="Last Name"
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              className="my-2 rounded-md p-1 text-black"
            />
            <h2>Login Details</h2>
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
                  signUp();
                }
              }}
              className="my-2 rounded-md p-1 text-black"
            />
            {userHasAccount === true ? (
              <span style={{ color: "red" }}>
                this email is already registered{" "}
                <Link href={"/login"}>Log in</Link>
              </span>
            ) : (
              ""
            )}
            {errmes ? (
              <span style={{ color: "red" }}>please enter a valid email</span>
            ) : (
              ""
            )}
            <p className="mx-1 my-2 ml-[10px] text-[10px] text-[#999999]">
              Minimum 8 characters with at least one uppercase, one lowercase,
              one special character and a number
            </p>
            <div className="checkbox flex items-center">
              <input
                type="checkbox"
                name=""
                id=""
                onChange={(e) => setCheckboxChecked(e.target.checked)}
              />
              <span className="mx-1 my-2 ml-[10px] text-[10px] text-[#999999]">
                By clicking 'Log In' you agree to our website PopcornTv Terms &
                Conditions.{" "}
              </span>
            </div>
            {isempty && (
              <span className="text-[10px] text-[#E50000]">
                please fill all the fields
              </span>
            )}
            <button
              className={`my-2 rounded-md bg-[#E50000] p-1 ${
                checkboxChecked === false ? "is-dark" : ""
              }`}
              onClick={() => {
                signUp();
              }}
              style={{ marginTop: "10px" }}
            >
              Register
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
