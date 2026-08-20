import React, { useEffect } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  SearchBar,
  Badge,
} from 'loka';

const App = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <section className="relative h-[80vh] w-full bg-black overflow-hidden flex flex-col items-center justify-center">
        <div className="absolute inset-0 opacity-40 mix-blend-overlay">
          <img
            src="https://images.unsplash.com/photo-1540039155732-d68a2bf56598?auto=format&fit=crop&q=80"
            alt="Concert Crowd"
            className="w-full h-full object-cover grayscale"
          />
        </div>

        <div className="relative z-10 text-center mb-12">
          <h1 className="text-[12vw] font-black text-white leading-none tracking-tighter uppercase mix-blend-difference">
            NEXUS '25
          </h1>
          <p className="text-xl md:text-3xl text-gray-200 mt-4 font-light tracking-wide">
            Feel the Energy. Live the Music.
          </p>
        </div>

        <div className="relative z-20 mt-8">
          <SearchBar className="transform scale-110" />
        </div>
      </section>

      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Trending Now</h2>
            <p className="text-gray-500 mt-2">The most anticipated events this month.</p>
          </div>
          <Button variant="outline">View All</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card hoverable className="overflow-hidden border-none shadow-md">
            <div className="aspect-[4/3] relative">
              <img
                src="https://images.unsplash.com/photo-1533174000255-164434ff60b6?auto=format&fit=crop&q=80"
                alt="Event"
                className="object-cover w-full h-full"
              />
              <Badge className="absolute top-4 left-4" variant="success">
                Selling Fast
              </Badge>
            </div>
            <CardHeader>
              <CardTitle>Synthwave Sunset</CardTitle>
              <CardDescription>Oct 3-5 • San Francisco, CA</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mt-2">
                <span className="font-semibold text-lg text-primary">$89</span>
                <Button size="sm">Get Tickets</Button>
              </div>
            </CardContent>
          </Card>

          <Card hoverable className="overflow-hidden border-none shadow-md">
            <div className="aspect-[4/3] relative">
              <img
                src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80"
                alt="Event"
                className="object-cover w-full h-full"
              />
              <Badge className="absolute top-4 left-4">Music Festival</Badge>
            </div>
            <CardHeader>
              <CardTitle>Neon Horizon</CardTitle>
              <CardDescription>Nov 14-15 • Austin, TX</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mt-2">
                <span className="font-semibold text-lg text-primary">$179</span>
                <Button size="sm">Get Tickets</Button>
              </div>
            </CardContent>
          </Card>

          <Card hoverable className="overflow-hidden border-none shadow-md">
            <div className="aspect-[4/3] relative">
              <img
                src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80"
                alt="Event"
                className="object-cover w-full h-full"
              />
              <Badge className="absolute top-4 left-4" variant="destructive">
                Sold Out
              </Badge>
            </div>
            <CardHeader>
              <CardTitle>Craft Tech 2025</CardTitle>
              <CardDescription>Dec 1-2 • New York, NY</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mt-2">
                <span className="font-semibold text-lg text-gray-400 line-through">$149</span>
                <Button size="sm" variant="secondary" disabled>
                  Join Waitlist
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default App;
