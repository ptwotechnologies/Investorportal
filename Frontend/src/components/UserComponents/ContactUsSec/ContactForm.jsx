import React, { useState } from 'react'

const interests = [
  {
    id: "startup",
    title: "Register as Startup",
    desc: "Get benefits of funding and resource access.",
  },
  {
    id: "service",
    title: "Register as Service Professional",
    desc: "Get listed and receive access to the network.",
  },
  {
    id: "investor",
    title: "Register as Investor",
    desc: "Get curated deal flow and startups.",
  },
  {
    id: "channel",
    title: "Register as Channel Partner",
    desc: "Get more visibility, perks and benefits.",
  },
]



const ContactForm = () => {

    const [selected, setSelected] = useState("startup")

  function onSubmit(e) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const payload = Object.fromEntries(formData.entries())
    // You can replace this with your submission logic or API route
    console.log("[v0] Contact form payload:", { ...payload, interest: selected })
    alert("Form submitted! Check console for payload.")
  }

  return (
  <form onSubmit={onSubmit} className="flex flex-col gap-4 pt-5 lg:pt-0">
      {/* Name row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            className="h-12 text-[#1D2A29CC] rounded-md border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            placeholder="First name"
          />
        </div>
        <div className="flex flex-col gap-2">
          <input
            id="lastName"
            name="lastName"
            type="text"
            required
            className="h-12 text-[#1D2A29CC] rounded-md border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            placeholder="Last name"
          />
        </div>
      </div>

      {/* Email */}
      <div className="flex flex-col gap-2">
        <input
          id="email"
          name="email"
          type="email"
          required
          className="h-12 text-[#1D2A29CC] rounded-md border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          placeholder="Work email address"
        />
      </div>

      {/* Company */}
      <div className="flex flex-col gap-2">
        <input
          id="company"
          name="company"
          type="text"
          required
          className="h-12 text-[#1D2A29CC] rounded-md border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          placeholder="Company name"
        />
      </div>

      {/* Interests */}
      <fieldset className="mt-10 ">
        <legend className="sr-only">What are you interested in?</legend>
        <div className="p-4">
          <p className="text-sm font-medium text-[#001D21]">What are you interested in?</p>
        </div>
        <div className="divide-y divide-border  border border-border rounded-md">
          {interests.map((opt) => {
            const active = selected === opt.id
            return (
              <label key={opt.id} className="flex items-start gap-3 p-4 cursor-pointer">
               
                <span className="flex-1">
                  <span className="block text-sm font-medium text-[#002B31]">{opt.title}</span>
                  <span className="block text-xs text-[#1D2A29CC] mt-1">{opt.desc}</span>
                </span>

                 <input
                  type="radio"
                  name="interest"
                  value={opt.id}
                  checked={active}
                  onChange={() => setSelected(opt.id)}
                  className="sr-only"
                  aria-checked={active}
                />
                <span
                  aria-hidden="true"
                  className={`mt-1 h-4 w-4 rounded-full border border-[#002B31] flex items-center justify-center`}
                >
                  <span className={`h-2.5 w-2.5 rounded-full ${active ? "bg-primary" : "bg-transparent"}`} />
                </span>
                
              </label>
            )
          })}
        </div>
      </fieldset>

      <div className="pt-12 pb-20">
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-sm bg-[#001032] px-6 py-3 text-sm font-medium text-primary-foreground"
        >
          Get Started
        </button>
      </div>

      <p className="text-[11px] leading-5 text-foreground/60">
        Please note that this is not an application to seek funding or other services for a new venture or business. By
        clicking Get Started you agree to Arbostar’s Privacy Policy.
      </p>
    </form>
  )
}

export default ContactForm
