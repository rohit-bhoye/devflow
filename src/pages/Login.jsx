import React, { useContext, useState } from "react";
import { LoginContext } from "../Context/LoginContext";
import { auth, db } from "../firebase/firebaseCongfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import { doc, getDoc } from "firebase/firestore";

function Login() {
  const { userName, setUserName, email, setEmail, password, setPassword } =
    useContext(LoginContext);

  const [newAccount, setNewAccount] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newAccount) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        setEmail("");
        setPassword("");
        setUserName("");
        navigate("/");
        setNewAccount(false);
      } catch (error) {
        if (error.code === "auth/email-already-in-use") {
          toast.error("This email is already registered.");
        } else if (error.code === "auth/invalid-email") {
          toast.error("Invalid email format.");
        } else if (error.code === "auth/weak-password") {
          toast.error("Password should be at least 6 characters.");
        } else {
          toast.error(`Registration failed: ${error.message}`);
        }
      }
    } else {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        const user = userCredential.user;
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          navigate("/home");
        } else {
          navigate("/createprofile");
        }
        setEmail("");
        setPassword("");
      } catch (error) {
        if (error.code === "auth/invalid-credential") {
          toast.error("Incorrect email or password.");
        } else {
          toast.error("Something went wrong.");
        }
      }
    }
  };

  const handleName = (e) => {
    setUserName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  return (
    <div className="absolute text-black top-0 left-0 w-full h-screen z-99 bg-zinc-100 flex flex-col items-center justify-center gap-[2rem]">
      <h1 className="text-blue-800 font-bold text-7xl">DevFlow</h1>
      <form
        onSubmit={handleSubmit}
        className="w-[30rem] p-[1rem] shadow-[0_0_20px_rgba(0,0,0,0.2)] rounded-[10px] text-center bg-white"
      >
        <div className="mb-[1rem] text-xl">
          {newAccount ? (
            <h2>Create a new account</h2>
          ) : (
            <h2>Log in to DevFlow</h2>
          )}
        </div>
        <div className="flex flex-col gap-3">
          {newAccount && (
            <input
              type="text"
              placeholder="Name"
              required
              value={userName}
              onChange={handleName}
              className="border border-black/10 p-[1rem] rounded-[5px] text-lg"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={handleEmail}
            className="border border-black/10 p-[1rem] rounded-[5px] text-lg"
          />
          <div className="group relative w-full flex  border border-black/10 rounded-[5px] focus-within:outline focus-within:outline-2">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              value={password}
              onChange={handlePassword}
              className="w-[95%] p-[1rem] rounded-[5px] text-lg outline-none"
            />
            {password.length > 0 && (
              <div className="absolute top-1/2 right-[2%] -translate-y-1/2 cursor-pointer">
                {showPassword ? (
                  <BiShow
                    onClick={() => setShowPassword(false)}
                    className=" w-[1.2rem] h-[1.2rem]"
                  />
                ) : (
                  <BiHide
                    onClick={() => setShowPassword(true)}
                    className=" w-[1.2rem] h-[1.2rem]"
                  />
                )}
              </div>
            )}
          </div>
          <div className="flex justify-between text-blue-700">
            <p className="cursor-pointer hover:underline">
              Forgot your password?
            </p>
            <p
              onClick={() => setNewAccount(!newAccount)}
              className="cursor-pointer hover:underline"
            >
              {newAccount ? "Login Here" : "Create account"}
            </p>
          </div>
          <div>
            <button
              type="submit"
              className="w-full p-[1rem] bg-blue-800 text-white rounded-[5px] font-bold text-xl cursor-pointer select-none"
            >
              {newAccount ? "Sign Up" : "Log In"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
