// FILE: src/app/(auth)/register/page.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: { street: "", city: "", pincode: "" },
    role: "Customer",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["street", "city", "pincode"].includes(name)) {
      setForm({ ...form, address: { ...form.address, [name]: value } });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      alert("Registered! Check your email to verify.");
      router.push("/login");
    } catch (err) {
      alert(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={submit} className="bg-white p-8 rounded-xl shadow w-full max-w-md">
        <h1 className="text-2xl text-orange-500 font-bold mb-6">Create Account</h1>
        <input className="input" name="name" placeholder="Name" onChange={handleChange} required />
        <input className="input" name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input className="input" name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <input className="input" name="phone" placeholder="Phone" onChange={handleChange} required />
        <input className="input" name="street" placeholder="Street" onChange={handleChange} />
        <input className="input" name="city" placeholder="City" onChange={handleChange} />
        <input className="input" name="pincode" placeholder="Pincode" onChange={handleChange} />
        <select className="input" name="role" onChange={handleChange}>
          <option value="Customer">Customer</option>
          <option value="Provider">Provider</option>
          <option value="Delivery">Delivery</option>
        </select>
        <button disabled={loading} className="btn-primary">{loading ? "Please wait..." : "Register"}</button>
      </form>
    </div>
  );
}

