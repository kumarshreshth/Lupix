import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import HeadingSection from './components/HeadingSection';
import InfiniteScroll from './components/InfiniteScroll';
import WorkSection from './components/WorkSection';
import BoxSection from './components/BoxSection';
import DefineSection from './components/DefineSection';
import CapabilitesSection from './components/CapabilitesSection';
import Last from './components/Last';
import MeetingForm from './components/MeetingForm';

const App = () => {
  const [hide, setHide] = useState(true);

  useEffect(() => {
    const scrollToTop = () => window.scrollTo(0, 0);

    window.addEventListener('beforeunload', scrollToTop);

    return () => window.removeEventListener('beforeunload', scrollToTop);
  }, []);

  return (
    <div className="bg-black h-full">
      <MeetingForm
        hide={hide}
        setHide={setHide}
      />
      <div className="sticky top-0 bg-black z-20">
        <Navbar
          hide={hide}
          setHide={setHide}
        />
      </div>
      <div className="mt-2 mb-0 md:mt-4 md:mb-0 overflow-hidden">
        <HeadingSection
          hide={hide}
          setHide={setHide}
        />
        <InfiniteScroll />
        <WorkSection />
        <BoxSection />
        <DefineSection />
        <CapabilitesSection
          hide={hide}
          setHide={setHide}
        />
        <Last
          hide={hide}
          setHide={setHide}
        />
      </div>
    </div>
  );
};

export default App;
