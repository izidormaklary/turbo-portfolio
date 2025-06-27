import { FiLoader } from "react-icons/fi";

export default function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center  bg-gradient-to-b shadow-foreground  from-foreground/20 dark:from-foreground/5 to-background">
      <div className="flex flex-col items-center justify-center space-y-4">
        <FiLoader className="h-12 w-12 animate-spin text-gray-500" />
        <p className="text-lg text-gray-700">Loading...</p>
      </div>
    </div>
  );
}
