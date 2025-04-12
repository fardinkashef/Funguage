"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LearningBreadCrumb() {
  const pathname = usePathname();

  // Split pathname into segments and remove empty strings
  // In JavaScript, the expression array.filter(Boolean) is a clever and concise way to remove any "falsy" values from an array. Passing Boolean as the callback function means that each element in the array will be evaluated for its truthiness.
  const segments = pathname.split("/").filter(Boolean);

  // Generate breadcrumb items
  const breadcrumbItems = segments.map((segment, index) => {
    // Create the path for this breadcrumb item
    const href = `/${segments.slice(0, index + 1).join("/")}`;

    // Check if this is the last segment (current page)
    const isLastSegment = index === segments.length - 1;

    // Format the segment for display (capitalize first letter)
    const formattedSegment = segment.charAt(0).toUpperCase() + segment.slice(1);

    return {
      href,
      label: formattedSegment,
      isLastSegment,
    };
  });

  return (
    <Breadcrumb className="py-4">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">
              Home
              {/* <span className="sr-only">Home</span> */}
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />

        {breadcrumbItems.map((item) => (
          <BreadcrumbItem key={item.href}>
            {item.isLastSegment ? (
              <BreadcrumbPage>{item.label}</BreadcrumbPage>
            ) : (
              <>
                <BreadcrumbLink asChild>
                  <Link href={item.href}>{item.label}</Link>
                </BreadcrumbLink>
                <BreadcrumbSeparator />
              </>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
