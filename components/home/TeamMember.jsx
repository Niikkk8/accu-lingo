import React from 'react';
import { Brain, PieChart, Users, Zap, AlertCircle, BarChart2, CodeXml } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const TeamMember = ({ name, role, college, email, github, src }) => (
  <div className="p-6 rounded-xl bg-white border border-gray-300 hover:border-gray-500 transition-all duration-300 shadow-md">
    <Image src={src} height={80} width={80} alt={name} className='mx-auto rounded-full mb-3 aspect-square object-cover' />
    <h3 className="text-lg font-bold text-gray-800 mb-1">{name}</h3>
    <p className="text-blue-600 font-medium mb-2">{role}</p>
    <p className="text-gray-700 text-sm mb-2">{college}</p>
    <div className="flex flex-col gap-1 text-sm">
      <a href={`mailto:${email}`} className="text-gray-700 hover:text-blue-600 transition-colors">{email}</a>
      <a href={github} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-600 transition-colors">GitHub</a>
    </div>
  </div>
);

export default function TeamMembers() {
  return (
    <>


      {/* Team Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-gray-600">The minds behind AccuLingo</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            <TeamMember
              name="Rajat Goswami"
              role="Team Lead"
              college="Nirma University (2027)"
              email="rajatgoswamix2003@gmail.com"
              github="https://github.com/rajatjoe"
              src={'/assets/rajat.jpg'}
            />
            <TeamMember
              name="Dev Mehta"
              role="AI/ML Developer"
              college="Nirma University (2027)"
              email="dev.mehta280@gmail.com"
              github="https://github.com/DD-og"
              src={'/assets/dev.jpg'}
            />
            <TeamMember
              name="Chinmay Patel"
              role="Backend Developer"
              college="Nirma University (2027)"
              email="chinmaypatel8181@gmail.com"
              github="https://github.com/Chinmay072"
              src={'/assets/chinmay.jpg'}
            />
            <TeamMember
              name="Niket Shah"
              role="Frontend Developer"
              college="Indus University (2025)"
              email="shahniket643@gmail.com"
              github="https://github.com/Niikkk8"
              src={'/assets/niket.png'}
            />
          </div>
        </div>
      </section>

    </>
  );
}