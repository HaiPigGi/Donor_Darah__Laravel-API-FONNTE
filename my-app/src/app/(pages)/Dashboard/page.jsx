"use client";
import React, { useState, useEffect } from 'react';
import DashboardLayout from "./DashboardLayout";
import HeroSection from "./HeroSection";
import TutorialSingkatSection from "./TutorialSingkatSection";
import InformasiPendonorSection from "./InfomasiPendonorSection";
import ArticleSection from "./ArticleSection";
import Footer from "@/_components/footer";
import Loading from '@/_components/Loading/Loading';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate a delay (e.g., API request)
    const delay = setTimeout(() => {
      setLoading(false);
    }, 4500);

    // Update progress every 50ms until it reaches 100%
    const progressInterval = setInterval(() => {
      setProgress(prevProgress => (prevProgress < 100 ? prevProgress + 1 : prevProgress));
    }, 50);

    // Cleanup the timeout and interval to avoid memory leaks
    return () => {
      clearTimeout(delay);
      clearInterval(progressInterval);
    };
  }, []);

  const sections = [
    <HeroSection />,
    <TutorialSingkatSection />,
    <InformasiPendonorSection />,
    <ArticleSection />,
    <Footer />,
  ];

  return (
    <DashboardLayout>
      <div>
        {loading ? (
          <Loading progress={progress} />
        ) : (
          sections.map((section, index) => (
            <React.Fragment key={index}>
              {section}
            </React.Fragment>
          ))
        )}
      </div>
    </DashboardLayout>
  );
}
