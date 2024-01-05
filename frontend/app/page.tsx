'use client';

import Navbar from '@/components/Navbar';
import NotesContent from '@/components/NotesContent';

export default function Home() {
  return (
    <main
      className="
        flex
        flex-col
        gap-y-10
      "
    >
      <Navbar />
      <NotesContent />
    </main>
  );
}
