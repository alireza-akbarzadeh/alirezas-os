"use client";

import type React from "react";

import {
  Mail,
  Github,
  Linkedin,
  Twitter,
  MapPin,
  Phone,
  Send,
  Sparkles,
  MessageCircle,
  Briefcase,
  HelpCircle,
  Star,
  Clock,
  CheckCircle2,
  Globe,
  Calendar,
} from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { WindowWrapper } from "@/components/window-wrapper";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type InquiryType = "general" | "project" | "job" | "feedback" | "support";

interface InquiryOption {
  id: InquiryType;
  label: string;
  icon: typeof Mail;
  description: string;
  color: string;
}

const inquiryTypes: InquiryOption[] = [
  {
    id: "general",
    label: "General",
    icon: MessageCircle,
    description: "Say hello or ask a question",
    color: "text-blue-500",
  },
  {
    id: "project",
    label: "Project",
    icon: Sparkles,
    description: "Collaborate on something new",
    color: "text-purple-500",
  },
  {
    id: "job",
    label: "Opportunity",
    icon: Briefcase,
    description: "Job or freelance work",
    color: "text-green-500",
  },
  {
    id: "feedback",
    label: "Feedback",
    icon: Star,
    description: "Share your thoughts",
    color: "text-amber-500",
  },
  {
    id: "support",
    label: "Support",
    icon: HelpCircle,
    description: "Get help with something",
    color: "text-red-500",
  },
];

const socialLinks = [
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/alireza-akbarzadeh",
    username: "@alireza-akbarzadeh",
    bg: "bg-gray-900 dark:bg-gray-100 dark:text-gray-900",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://linkedin.com/in/alireza-akbarzadeh",
    username: "alireza-akbarzadeh",
    bg: "bg-[#0A66C2]",
  },
  {
    icon: Twitter,
    label: "Twitter",
    href: "https://twitter.com",
    username: "@alireza_dev",
    bg: "bg-black dark:bg-white dark:text-black",
  },
];

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "alireza.akbarzadeh.dev@gmail.com",
    href: "mailto:alireza.akbarzadeh.dev@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+98 938 122 3380",
    href: "tel:+989381223380",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Tehran, Iran",
  },
  {
    icon: Globe,
    label: "Website",
    value: "alireza.dev",
    href: "https://alireza.dev",
  },
];

export function ContactWindow() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [selectedType, setSelectedType] = useState<InquiryType>("general");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    setTimeout(() => {
      setStatus("sent");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 3000);
    }, 1500);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const selectedInquiry = inquiryTypes.find((t) => t.id === selectedType);

  return (
    <WindowWrapper
      windowType="contact"
      title="Contact"
      defaultWidth={960}
      defaultHeight={680}
      minWidth={800}
      minHeight={560}
      headerContent={
        <div className="flex items-center gap-2 text-xs text-white/60">
          <Clock className="h-3 w-3" />
          <span>Usually responds within 24h</span>
        </div>
      }
    >
      <div className="flex h-full overflow-hidden bg-[#f5f5f7] dark:bg-[#1c1c1e]">
        {/* Sidebar */}
        <div className="flex w-72 flex-col border-r border-black/5 bg-[#e8e8ed]/80 backdrop-blur-xl dark:border-white/5 dark:bg-[#2c2c2e]/80">
          {/* Profile Card */}
          <div className="p-5">
            <div className="rounded-2xl bg-white/80 p-5 shadow-sm backdrop-blur-sm dark:bg-white/5">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Avatar className="h-16 w-16 ring-2 ring-white/50 dark:ring-white/10">
                    <AvatarImage
                      src="/professional-developer-portrait.png"
                      alt="Alireza"
                    />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-lg font-semibold text-white">
                      AA
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -right-0.5 -bottom-0.5 h-4 w-4 rounded-full border-2 border-white bg-green-500 dark:border-[#2c2c2e]" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Alireza Akbarzadeh
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Full Stack Developer
                  </p>
                  <div className="mt-1 flex items-center gap-1.5">
                    <span className="text-xs text-green-600 dark:text-green-400">
                      Available for hire
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="flex-1 overflow-auto px-3">
            <p className="mb-2 px-2 text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400">
              Contact Info
            </p>
            <div className="space-y-0.5">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                const content = (
                  <div
                    key={index}
                    className="group flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all hover:bg-white/60 dark:hover:bg-white/5"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-100 transition-colors group-hover:bg-blue-100 dark:bg-white/10 dark:group-hover:bg-blue-500/20">
                      <Icon className="h-4 w-4 text-gray-600 transition-colors group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-400" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-medium tracking-wider text-gray-400 uppercase dark:text-gray-500">
                        {item.label}
                      </p>
                      <p className="truncate text-sm text-gray-900 dark:text-white">
                        {item.value}
                      </p>
                    </div>
                  </div>
                );
                return item.href ? (
                  <a
                    key={index}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {content}
                  </a>
                ) : (
                  <div key={index}>{content}</div>
                );
              })}
            </div>

            {/* Social Links */}
            <p className="mt-6 mb-2 px-2 text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400">
              Social
            </p>
            <div className="space-y-1">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-white/60 dark:hover:bg-white/5"
                  >
                    <div
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-lg text-white",
                        social.bg,
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {social.label}
                      </p>
                      <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                        {social.username}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Availability Footer */}
          <div className="border-t border-black/5 p-4 dark:border-white/5">
            <div className="flex items-center gap-3 rounded-xl bg-green-500/10 px-3 py-2.5">
              <Calendar className="h-4 w-4 text-green-600 dark:text-green-400" />
              <div>
                <p className="text-xs font-medium text-green-700 dark:text-green-300">
                  Open to opportunities
                </p>
                <p className="text-[10px] text-green-600/80 dark:text-green-400/80">
                  Freelance & Full-time
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 flex-col">
          {/* Inquiry Type Selector */}
          <div className="border-b border-black/5 bg-white/50 px-6 py-4 backdrop-blur-xl dark:border-white/5 dark:bg-white/5">
            <p className="mb-3 text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400">
              What can I help you with?
            </p>
            <div className="flex gap-2">
              {inquiryTypes.map((type) => {
                const Icon = type.icon;
                const isSelected = selectedType === type.id;
                return (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={cn(
                      "flex flex-col items-center gap-1.5 rounded-xl px-4 py-3 transition-all",
                      isSelected
                        ? "bg-white shadow-sm ring-1 ring-black/5 dark:bg-white/10 dark:ring-white/10"
                        : "hover:bg-white/60 dark:hover:bg-white/5",
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-5 w-5",
                        isSelected ? type.color : "text-gray-400",
                      )}
                    />
                    <span
                      className={cn(
                        "text-xs font-medium",
                        isSelected
                          ? "text-gray-900 dark:text-white"
                          : "text-gray-500 dark:text-gray-400",
                      )}
                    >
                      {type.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form */}
          <div className="flex-1 overflow-auto">
            <form onSubmit={handleSubmit} className="p-6">
              <div className="mx-auto max-w-xl space-y-5">
                {/* Selected Type Header */}
                <div className="flex items-center gap-3 rounded-xl bg-white/60 p-4 backdrop-blur-sm dark:bg-white/5">
                  {selectedInquiry && (
                    <>
                      <div
                        className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br",
                          selectedType === "general" &&
                            "from-blue-500 to-blue-600",
                          selectedType === "project" &&
                            "from-purple-500 to-purple-600",
                          selectedType === "job" &&
                            "from-green-500 to-green-600",
                          selectedType === "feedback" &&
                            "from-amber-500 to-amber-600",
                          selectedType === "support" &&
                            "from-red-500 to-red-600",
                        )}
                      >
                        <selectedInquiry.icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {selectedInquiry.label} Inquiry
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {selectedInquiry.description}
                        </p>
                      </div>
                    </>
                  )}
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-gray-600 dark:text-gray-300">
                      Your Name
                    </label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                      className="h-11 rounded-xl border-0 bg-white/80 shadow-sm ring-1 ring-black/5 backdrop-blur-sm transition-shadow placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 dark:bg-white/10 dark:ring-white/10"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-gray-600 dark:text-gray-300">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                      className="h-11 rounded-xl border-0 bg-white/80 shadow-sm ring-1 ring-black/5 backdrop-blur-sm transition-shadow placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 dark:bg-white/10 dark:ring-white/10"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-600 dark:text-gray-300">
                    Subject
                  </label>
                  <Input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="What's this about?"
                    className="h-11 rounded-xl border-0 bg-white/80 shadow-sm ring-1 ring-black/5 backdrop-blur-sm transition-shadow placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 dark:bg-white/10 dark:ring-white/10"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-600 dark:text-gray-300">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Tell me about your project, idea, or question..."
                    className="w-full resize-none rounded-xl border-0 bg-white/80 px-4 py-3 text-sm shadow-sm ring-1 ring-black/5 backdrop-blur-sm transition-shadow placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-white/10 dark:text-white dark:ring-white/10"
                  />
                </div>

                {/* Submit */}
                <div className="flex items-center justify-between pt-2">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    I'll get back to you within 24 hours
                  </p>
                  <Button
                    type="submit"
                    disabled={status === "sending"}
                    className={cn(
                      "h-11 gap-2 rounded-xl px-6 font-medium shadow-lg transition-all",
                      status === "sent"
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
                    )}
                  >
                    {status === "sending" ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Sending...
                      </>
                    ) : status === "sent" ? (
                      <>
                        <CheckCircle2 className="h-4 w-4" />
                        Sent!
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </div>

                {status === "sent" && (
                  <div className="animate-in fade-in slide-in-from-bottom-2 rounded-xl bg-green-500/10 p-4 text-center">
                    <p className="font-medium text-green-700 dark:text-green-300">
                      Message sent successfully!
                    </p>
                    <p className="mt-1 text-sm text-green-600 dark:text-green-400">
                      Thanks for reaching out. I'll reply as soon as possible.
                    </p>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </WindowWrapper>
  );
}
