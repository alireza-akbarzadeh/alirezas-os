"use client";

import type React from "react";
import { ContactForm } from "./ContactForm";
import { ContactSidebar } from "./ContactSidebar";

import { WindowWrapper } from "@/components/window-wrapper";
import {
  Briefcase,
  Clock,
  Github,
  Globe,
  HelpCircle,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Sparkles,
  Star,
  Twitter,
} from "lucide-react";
import { useState } from "react";

export type InquiryType =
  | "general"
  | "project"
  | "job"
  | "feedback"
  | "support";

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
        <ContactSidebar contactInfo={contactInfo} socialLinks={socialLinks} />
        <ContactForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          status={status}
          selectedInquiry={selectedInquiry}
          selectedType={selectedType}
          inquiryTypes={inquiryTypes}
          setSelectedType={setSelectedType}
        />
      </div>
    </WindowWrapper>
  );
}
