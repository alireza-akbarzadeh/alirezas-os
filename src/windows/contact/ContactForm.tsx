import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Send, CheckCircle2 } from "lucide-react";

interface ContactFormProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  status: "idle" | "sending" | "sent" | "error";
  selectedInquiry: any;
  selectedType: string;
  inquiryTypes: any[];
  setSelectedType: (type: string) => void;
}

export function ContactForm({
  formData,
  handleChange,
  handleSubmit,
  status,
  selectedInquiry,
  selectedType,
  inquiryTypes,
  setSelectedType,
}: ContactFormProps) {
  return (
    <div className="flex-1 overflow-auto">
      {/* Inquiry Type Selector */}
      <div className="border-b border-black/5 bg-white/50 px-6 py-4 backdrop-blur-xl dark:border-white/5 dark:bg-white/5">
        <p className="mb-3 text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400">What can I help you with?</p>
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
                <Icon className={cn("h-5 w-5", isSelected ? type.color : "text-gray-400")} />
                <span className={cn("text-xs font-medium", isSelected ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400")}>{type.label}</span>
              </button>
            );
          })}
        </div>
      </div>
      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6">
        <div className="mx-auto max-w-xl space-y-5">
          {/* Selected Type Header */}
          <div className="flex items-center gap-3 rounded-xl bg-white/60 p-4 backdrop-blur-sm dark:bg-white/5">
            {selectedInquiry && (
              <>
                <div className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br",
                  selectedType === "general" && "from-blue-500 to-blue-600",
                  selectedType === "project" && "from-purple-500 to-purple-600",
                  selectedType === "job" && "from-green-500 to-green-600",
                  selectedType === "feedback" && "from-amber-500 to-amber-600",
                  selectedType === "support" && "from-red-500 to-red-600",
                )}>
                  <selectedInquiry.icon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{selectedInquiry.label} Inquiry</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{selectedInquiry.description}</p>
                </div>
              </>
            )}
          </div>
          {/* Form Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-600 dark:text-gray-300">Your Name</label>
              <Input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="John Doe" className="h-11 rounded-xl border-0 bg-white/80 shadow-sm ring-1 ring-black/5 backdrop-blur-sm transition-shadow placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 dark:bg-white/10 dark:ring-white/10" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-600 dark:text-gray-300">Email Address</label>
              <Input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="john@example.com" className="h-11 rounded-xl border-0 bg-white/80 shadow-sm ring-1 ring-black/5 backdrop-blur-sm transition-shadow placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 dark:bg-white/10 dark:ring-white/10" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-600 dark:text-gray-300">Subject</label>
            <Input type="text" name="subject" value={formData.subject} onChange={handleChange} required placeholder="What's this about?" className="h-11 rounded-xl border-0 bg-white/80 shadow-sm ring-1 ring-black/5 backdrop-blur-sm transition-shadow placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 dark:bg-white/10 dark:ring-white/10" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-600 dark:text-gray-300">Message</label>
            <textarea name="message" value={formData.message} onChange={handleChange} required rows={6} placeholder="Tell me about your project, idea, or question..." className="w-full resize-none rounded-xl border-0 bg-white/80 px-4 py-3 text-sm shadow-sm ring-1 ring-black/5 backdrop-blur-sm transition-shadow placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-white/10 dark:text-white dark:ring-white/10" />
          </div>
          {/* Submit */}
          <div className="flex items-center justify-between pt-2">
            <p className="text-xs text-gray-500 dark:text-gray-400">I'll get back to you within 24 hours</p>
            <Button type="submit" disabled={status === "sending"} className={cn("h-11 gap-2 rounded-xl px-6 font-medium shadow-lg transition-all", status === "sent" ? "bg-green-500 hover:bg-green-600" : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700")}>
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
              <p className="font-medium text-green-700 dark:text-green-300">Message sent successfully!</p>
              <p className="mt-1 text-sm text-green-600 dark:text-green-400">Thanks for reaching out. I'll reply as soon as possible.</p>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}