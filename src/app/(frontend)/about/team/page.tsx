import type { Metadata } from "next";
import Link from "next/link";
import {
  Users,
  MapPin,
  Mail,
  Award,
  Building2,
  Globe,
  Clock,
  Briefcase,
  ArrowRight,
} from "lucide-react";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { CTABanner } from "@/components/sections/cta-banner";

export const metadata: Metadata = {
  title: "Our Team — Meet the People Behind CloudTravelSolution",
  description:
    "Meet the experienced team at CloudTravelSolution. Our visa consultants, travel advisors, and support staff are dedicated to making your international travel seamless.",
};

interface TeamMember {
  name: string;
  initials: string;
  role: string;
  bio: string;
  location: string;
  experience: string;
  color: string;
}

const leadership: TeamMember[] = [
  {
    name: "Rajesh Kumar",
    initials: "RK",
    role: "Founder & CEO",
    bio: "With over 20 years in the travel industry, Rajesh founded CloudTravelSolution in 2004 with a vision to simplify visa processing for Indians. His deep understanding of immigration policies and passion for client success has grown CTS from a single office in Bangalore to a multi-city operation serving thousands of travellers annually.",
    location: "Bangalore",
    experience: "20+ years",
    color: "var(--color-primary)",
  },
  {
    name: "Priya Sharma",
    initials: "PS",
    role: "Head of Visa Operations",
    bio: "Priya leads our entire visa operations division, specializing in US, UK, and Schengen visa applications. With 12+ years of experience and an in-depth knowledge of embassy requirements, she has maintained a consistently high approval rate. Her meticulous approach to documentation ensures every application is thorough and compelling.",
    location: "Bangalore",
    experience: "12+ years",
    color: "var(--color-secondary)",
  },
  {
    name: "Mohammed Irfan",
    initials: "MI",
    role: "Lead Travel Advisor",
    bio: "Mohammed brings 15+ years of expertise in corporate travel management and MICE (Meetings, Incentives, Conferences & Exhibitions) planning. He has built long-standing relationships with airlines, hotels, and ground operators worldwide, enabling CTS to deliver exceptional group and corporate travel experiences at competitive rates.",
    location: "Hyderabad",
    experience: "15+ years",
    color: "var(--color-accent)",
  },
];

const teamMembers: TeamMember[] = [
  {
    name: "Amit Reddy",
    initials: "AR",
    role: "Branch Manager, Hyderabad",
    bio: "Manages all Hyderabad operations and client relationships. 10+ years of experience in travel consulting and branch management.",
    location: "Hyderabad",
    experience: "10+ years",
    color: "var(--color-primary)",
  },
  {
    name: "Sneha Patel",
    initials: "SP",
    role: "Senior Visa Consultant",
    bio: "Expert in student and work visa categories across multiple countries. Specializes in complex visa cases with 8+ years of hands-on experience.",
    location: "Bangalore",
    experience: "8+ years",
    color: "var(--color-secondary)",
  },
  {
    name: "Ananya Krishnan",
    initials: "AK",
    role: "Digital Marketing Lead",
    bio: "Drives CTS's online presence through SEO, content strategy, and social media. 5+ years of experience in digital marketing for the travel industry.",
    location: "Bangalore",
    experience: "5+ years",
    color: "var(--color-accent)",
  },
  {
    name: "Vikram Singh",
    initials: "VS",
    role: "Client Relations Manager",
    bio: "Ensures every client has an outstanding experience with CTS. Leads customer success initiatives with 7+ years of experience in client management.",
    location: "Delhi (Upcoming)",
    experience: "7+ years",
    color: "var(--color-primary)",
  },
  {
    name: "Deepa Nair",
    initials: "DN",
    role: "Documentation Specialist",
    bio: "Handles document verification and processing with precision. 6+ years of experience ensuring applications are complete and error-free.",
    location: "Bangalore",
    experience: "6+ years",
    color: "var(--color-secondary)",
  },
];

const stats = [
  { icon: Clock, label: "Years Experience", value: "20+" },
  { icon: Users, label: "Staff", value: "50+" },
  { icon: Building2, label: "City Offices", value: "4" },
  { icon: Globe, label: "Happy Clients", value: "10,000+" },
];

export default function TeamPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { name: "Home", href: "/" },
          { name: "About", href: "/about" },
          { name: "Our Team", href: "/about/team" },
        ]}
      />

      <div className="bg-white">
        {/* Hero */}
        <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
            <div className="max-w-3xl">
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">Our Team</h1>
              <p className="text-lg text-white/80 leading-relaxed">
                Behind every successful visa application and seamless travel
                experience is a dedicated team of professionals. Meet the people
                who make CloudTravelSolution India&apos;s trusted travel partner.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-border">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-3 py-6 px-4 lg:px-6"
                >
                  <stat.icon className="h-6 w-6 text-[var(--color-primary)] shrink-0" />
                  <div>
                    <div className="text-2xl font-bold text-foreground">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Leadership Section */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-3">
              Leadership
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our leadership team brings decades of combined experience in
              travel, visa consulting, and corporate travel management.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {leadership.map((member) => (
              <div
                key={member.name}
                className="p-8 rounded-xl border border-border bg-white hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-4 mb-5">
                  <div
                    className="h-16 w-16 rounded-full flex items-center justify-center text-white text-xl font-bold shrink-0"
                    style={{ backgroundColor: member.color }}
                  >
                    {member.initials}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">
                      {member.name}
                    </h3>
                    <p className="text-sm font-medium text-[var(--color-primary)]">
                      {member.role}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                  {member.bio}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" />
                    {member.location}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Award className="h-3.5 w-3.5" />
                    {member.experience}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Grid */}
        <div className="bg-[var(--color-muted)]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-3">
                Our Specialists
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                A skilled team of consultants, specialists, and support staff
                working together to deliver the best travel experience.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamMembers.map((member) => (
                <div
                  key={member.name}
                  className="p-6 bg-white rounded-xl border border-border hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="h-12 w-12 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                      style={{ backgroundColor: member.color }}
                    >
                      {member.initials}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {member.name}
                      </h3>
                      <p className="text-sm text-[var(--color-primary)]">
                        {member.role}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {member.bio}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {member.location}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Award className="h-3 w-3" />
                      {member.experience}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Join Our Team */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-[var(--color-accent)]/10 mb-5">
              <Briefcase className="h-7 w-7 text-[var(--color-accent)]" />
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-3">
              Join Our Team
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              We&apos;re always looking for passionate individuals who share our
              vision of making international travel accessible. If you love
              travel, enjoy helping people, and want to grow your career with a
              company that values you — we&apos;d love to hear from you.
            </p>
            <a
              href="mailto:careers@cloudtravelsolution.com"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] text-white font-semibold rounded-lg transition-colors"
            >
              <Mail className="h-4 w-4" />
              careers@cloudtravelsolution.com
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      <CTABanner />
    </>
  );
}
