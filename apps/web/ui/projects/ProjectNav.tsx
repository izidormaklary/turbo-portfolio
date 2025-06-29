"use client";
import { useCallback, useState } from "react";
import groupBy from "lodash/groupBy";
import { useSearchParams } from "next/navigation";
import { FiMenu } from "react-icons/fi";
interface Props {
  pages: { pageId: string; priority?: number; title: string; group: string }[];
}
export default function ProjectNav({ pages }: Props) {
  const onNavClick = useCallback((pageId: string) => {
    window.history.pushState(null, "", `/?project=${pageId}`);
    // router.push(`/home/${pageId}`);
  }, []);
  const params = useSearchParams();
  const currentFocus = params.get("project");
  const navGroups = groupBy(pages, (e) => e.group);
  const [showNav, setShowNav] = useState(false);
  const groupFocus = currentFocus
    ? Object.entries(navGroups).find(([, p]) =>
        p.some(
          (e) =>
            e.title.replace(" ", "-").toLowerCase() ===
            currentFocus.toLowerCase()
        )
      )?.[0] || "about"
    : "about";
  return (
    <>
      <nav className="fixed max-h-screen z-10 overflow-scroll  top-2 pl-2 left-0 md:sticky md:max-h-max md:min-w-52 flex flex-col gap-2 ">
        <button
          className="sticky top-0 rounded-full   md:hidden mr-auto  bg-background p-4 shadow-md cursor-pointer"
          onClick={() => setShowNav(!showNav)}
        >
          <FiMenu
            className={` transition-transform ${showNav ? "rotate-90" : " rorate-0"}`}
          />
        </button>
        <h2 className={`hidden md:block text-xl pt-4 font-semibold`}>
          Izidor Maklary
        </h2>

        <div
          className={`rounded-md transition-all ${showNav ? "h-screen" : "h-0 overflow-hidden md:h-auto"}`}
        >
          <div className={`bg-background/95 rounded-md shadow-md`}>
            {Object.entries(navGroups).map(([group, groupPages]) => (
              <div key={group} className={`flex flex-col p-2 justify-start `}>
                <h2
                  className={`text-lg  font-semibold ${
                    group === groupFocus
                      ? "text-foreground/60 dark:text-amber-100  "
                      : " "
                  }`}
                >
                  {group}
                </h2>
                {groupPages
                  .sort((a, b) => (a.priority ?? 0) - (b.priority ?? 0))
                  .map((page) => (
                    <button
                      key={page.pageId}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavClick(page.title.replace(" ", "-"));
                        setShowNav(false);
                      }}
                      className={`border-l-[2px]  p-2  transition-color ml-4  cursor-pointer ${
                        currentFocus === page.title.replace(" ", "-")
                          ? "dark:border-amber-300 border-l-[4px] text-foreground/60 dark:text-amber-100 ml-[14px] rounded-xs "
                          : " hover:text-amber-100/70"
                      }  hover:border-amber-300  text-left`}
                    >
                      {page.title}
                    </button>
                  ))}
              </div>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}
