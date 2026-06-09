import React, { useState } from 'react'
import { Loader, LoaderIcon, LockIcon , MailIcon, MessageCircleIcon, UserIcon } from 'lucide-react'
import { useAuthStore , } from '../store/useAuthStore'
import { Link  } from 'react-router-dom'
import toast from 'react-hot-toast';
function SignUpPage() {
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });
  const { signup, isSigningUp , verifyOtp ,generateOtp ,isVerified } = useAuthStore();

  // for otp verificaation
  const [otp,setOtp] = useState("")
  // console.log(email)
  // console.log(otp)

  // console.log(isSigningUp)

const handleOtp = ()=>{
  verifyOtp(formData.email,otp)
}
const handleGenerateOtp = ()=>{
  generateOtp(formData.email)
}

  const handleSubmit = (e) => { 
    // console.log(formData)  
    e.preventDefault();
     if(!isVerified){
    return toast.error("Please verify OTP first")
  }

    signup(formData);
  };  
  
  return (
    <div className="w-full  flex items-center justify-center p-4 bg-slate-900 ">
      <div className="relative w-full max-w-6xl   h-[600px] flex justify-center items-center">
              
          <div className="w-full flex flex-col md:flex-row  ring-2 ring-slate-500/50 rounded-lg overflow-hidden shadow-xl ">  
            {/* FORM CLOUMN - LEFT SIDE */}
            <div className="md:w-1/2 p-8 flex items-center justify-center md:border-r border-slate-600/30">
              <div className="w-full max-w-md">
                {/* HEADING TEXT */}
                <div className="text-center mb-8">
                  <MessageCircleIcon className="w-12 h-12 mx-auto text-slate-400 mb-4" />
                  <h2 className="text-2xl font-bold text-slate-200 mb-2">Create Account</h2>
                  <p className="text-slate-400">Sign up for a new account</p>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="space-y-6">     
                  {/* FULL NAME */}
                  <div>
                    <label className="auth-input-label">Full Name</label>
                    <div className="relative">
                      <UserIcon className="auth-input-icon" />
  
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="input"
                        placeholder="ganesh gite"
                      />
                    </div>
                  </div>

                  {/* EMAIL INPUT */}
                  <div>
                    <label className="auth-input-label">Email</label>
                    <div className="relative">
                      <MailIcon className="auth-input-icon" />

                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value }) }
                        className="input"
                        placeholder="ganeshgite@gmail.com"
                      />
                    </div>
                  </div>

                  {/* PASSWORD INPUT */}
                  <div>
                    <label className="auth-input-label">Password</label>
                    <div className="relative">
                      <LockIcon className="auth-input-icon" />

                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="input"
                        placeholder="Enter your password"
                      />
                    </div>
                  </div>

                  {/* OTP Generate BUTTON */}

 <button className="cursor-pointer auth-btn" type="button" onClick={handleGenerateOtp}  >
                    {isSigningUp ? (
                      <LoaderIcon className="w-full h-5 animate-spin text-center" />
                    ) : (
                      "Generate OTP"
                    )}
                  </button>

                   {/* OTP INPUT */}
                  <div>
                    <label className="auth-input-label"> OTP</label>
                    <div className="relative">
                      <LockIcon className="auth-input-icon" />

                      <input
                        type="number"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="input"
                        placeholder="Enter your OTP"
                      />
                    </div>
                  </div>

                  {/* OTP Verify BUTTON */}

 <button className="cursor-pointer auth-btn" type="button" onClick={handleOtp}  disabled={isVerified} >
                    {isSigningUp ? (
                      <LoaderIcon className="w-full h-5 animate-spin text-center" />
                    ) : (
                      ` ${isVerified ? "OTP Verified" : "Verify OTP"}`
                    )}
                  </button>

                  {/* SUBMIT BUTTON */}

                  <button className="cursor-pointer auth-btn" type="submit" disabled={isSigningUp}>
                    {isSigningUp ? (
                      <LoaderIcon className="w-full h-5 animate-spin text-center" />
                    ) : (
                      "Sign up"
                    )}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <Link to="/login" className="auth-link">
                    Already have an account? Login
                  </Link>
                </div>
              </div>
            </div>

            {/* FORM ILLUSTRATION - RIGHT SIDE */}
            <div className="hidden md:w-1/2 md:flex items-center justify-center p-6 bg-gradient-to-bl from-slate-800/20 to-transparent md:border-r border-slate-600/30">
              <div>
                <img
                  src="/signup.png"
                  alt="People using mobile devices"
                  className="w-full h-auto object-contain"
                />
                <div className="mt-6 text-center">
                  <h3 className="text-xl font-medium text-cyan-400">Start Your Journey Today</h3>

                  <div className="mt-4 flex justify-center gap-4">
                    <span className="auth-badge">Free</span>
                    <span className="auth-badge">Easy Setup</span>
                    <span className="auth-badge">Private</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
         
      </div>
    </div>
  );
}

export default SignUpPage