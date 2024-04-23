"use client";

import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/hooks/use-profile";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Right from "@/components/icons/Right";
import { useEffect, useState } from "react";

export default function MenuItemsPage() {
  const { loading, data } = useProfile();
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetch("/api/menu-items").then((res) => {
      res.json().then((menuItems) => {
        setMenuItems(menuItems);
      });
    });
  }, []);

  if (loading) {
    return "Loading User Info...";
  }

  if (!data.admin) {
    return redirect("/404");
  }

  return (
    <section className="mt-8 max-w-md mx-auto">
      <UserTabs isAdmin={true} />
      <div className="mt-8">
        <Link
          className="button !flex justify-between hover:border-primary hover:bg-primary hover:text-white transition-all duration-300 ease-in-out"
          href={"/menu-items/new"}
        >
          <span className="uppercase">Create new menu items</span>
          <Right />
        </Link>
      </div>
      <div>
        <h2 className="text-sm text-gray-500 mt-8">Edit menu item:</h2>
        <div className="grid grid-cols-3 gap-2">
          {menuItems?.length > 0 &&
            menuItems.map((item, index) => (
              <Link
                href={"/menu-items/edit/" + item._id}
                className="bg-gray-200 rounded-lg p-4"
                key={index}
              >
                <div className="relative">
                  <Image
                    src={item.image}
                    className="rounded-md"
                    alt=""
                    width={200}
                    height={200}
                  />
                </div>
                <div className="text-center">{item.name}</div>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}
