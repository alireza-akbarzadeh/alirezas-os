import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Calendar } from "lucide-react";

interface ContactSidebarProps {
  contactInfo: Array<any>;
  socialLinks: Array<any>;
}

export function ContactSidebar({ contactInfo, socialLinks }: ContactSidebarProps) {
  return (
    <div className="flex w-72 flex-col border-r border-black/5 bg-[#e8e8ed]/80 backdrop-blur-xl dark:border-white/5 dark:bg-[#2c2c2e]/80">
      {/* Profile Card */}
      <div className="p-5">
        <div className="rounded-2xl bg-white/80 p-5 shadow-sm backdrop-blur-sm dark:bg-white/5">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar className="h-16 w-16 ring-2 ring-white/50 dark:ring-white/10">
                <AvatarImage src="/professional-developer-portrait.png" alt="Alireza" />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-lg font-semibold text-white">AA</AvatarFallback>
              </Avatar>
              <div className="absolute -right-0.5 -bottom-0.5 h-4 w-4 rounded-full border-2 border-white bg-green-500 dark:border-[#2c2c2e]" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-gray-900 dark:text-white">Alireza Akbarzadeh</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Full Stack Developer</p>
              <div className="mt-1 flex items-center gap-1.5">
                <span className="text-xs text-green-600 dark:text-green-400">Available for hire</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Contact Info */}
      <div className="flex-1 overflow-auto px-3">
        <p className="mb-2 px-2 text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400">Contact Info</p>
        <div className="space-y-0.5">
          {contactInfo.map((item, index) => {
            const Icon = item.icon;
            const content = (
              <div key={index} className="group flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all hover:bg-white/60 dark:hover:bg-white/5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-100 transition-colors group-hover:bg-blue-100 dark:bg-white/10 dark:group-hover:bg-blue-500/20">
                  <Icon className="h-4 w-4 text-gray-600 transition-colors group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-medium tracking-wider text-gray-400 uppercase dark:text-gray-500">{item.label}</p>
                  <p className="truncate text-sm text-gray-900 dark:text-white">{item.value}</p>
                </div>
              </div>
            );
            return item.href ? (
              <a key={index} href={item.href} target="_blank" rel="noopener noreferrer">{content}</a>
            ) : (
              <div key={index}>{content}</div>
            );
          })}
        </div>
        {/* Social Links */}
        <p className="mt-6 mb-2 px-2 text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400">Social</p>
        <div className="space-y-1">
          {socialLinks.map((social, index) => {
            const Icon = social.icon;
            return (
              <a key={index} href={social.href} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-white/60 dark:hover:bg-white/5">
                <div className={cn("flex h-8 w-8 items-center justify-center rounded-lg text-white", social.bg)}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{social.label}</p>
                  <p className="truncate text-xs text-gray-500 dark:text-gray-400">{social.username}</p>
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
            <p className="text-xs font-medium text-green-700 dark:text-green-300">Open to opportunities</p>
            <p className="text-[10px] text-green-600/80 dark:text-green-400/80">Freelance & Full-time</p>
          </div>
        </div>
      </div>
    </div>
  );
}