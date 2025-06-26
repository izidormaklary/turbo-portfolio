"use client";
import { useCallback } from "react";
import groupBy from "lodash/groupBy";
import { useSearchParams } from "next/navigation";
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
  return (
    <nav className="flex flex-col gap-6 sticky top-0">
      <h2 className="text-xl pt-4 font-semibold">Izidor Maklary</h2>

      {Object.entries(navGroups).map(([group, groupPages]) => (
        <div key={group} className="flex flex-col ml-2 justify-start">
          <h2 className="text-lg font-semibold">{group}</h2>
          {groupPages
            .sort((a, b) => (a.priority ?? 0) - (b.priority ?? 0))
            .map((page) => (
              <button
                key={page.pageId}
                onClick={(e) => {
                  e.preventDefault();
                  onNavClick(page.title.replace(" ", "-"));
                }}
                className={`border-l-[2px]  p-2  transition-color ml-4  cursor-pointer ${
                  currentFocus === page.title.replace(" ", "-")
                    ? "border-amber-300 border-l-[4px] text-amber-100 ml-[14px] rounded-xs "
                    : " hover:text-amber-100/70"
                }  hover:border-amber-300  text-left`}
              >
                {page.title}
              </button>
            ))}
        </div>
      ))}
    </nav>
  );
}
