"use client";

import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/hooks/use-profile";

import { useEffect, useState } from "react";
import { redirect, useParams } from "next/navigation";
import Link from "next/link";
import Left from "@/components/icons/Left";
import { toast } from "react-hot-toast";

export default function EditMenuItemPage() {
  const { id } = useParams();

  const { loading, data } = useProfile();
  const [redirectToItems, setRedirectToItems] = useState(false);

  useEffect(() => {
    fetch("/api/menu-items").then((res) => {
      res.json().then((items) => {
        const item = items.find((i) => i._id === id);
        setImage(item.image);
        setName(item.name);
        setDescription(item.description);
        setBasePrice(item.basePrice);
      });
    });
  }, []);

  async function handleFormSubmit(e) {
    e.preventDefault();
    const data = { image, name, description, basePrice, _id: id };

    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu-items", {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) resolve();
      else reject();
    });

    await toast.promise(savingPromise, {
      loading: "Saving this item.",
      success: "Saved successfully!",
      error: "Failed to save.",
    });

    setRedirectToItems(true);
  }

  if (redirectToItems) {
    return redirect("/menu-items");
  }

  if (loading) {
    return "Loading User Info...";
  }

  if (!data.admin) {
    return redirect("/404");
  }

  return (
    <section className="mt-8">
      <UserTabs isAdmin={true} />
      <div className="mt-8 max-w-md mx-auto">
        <Link
          className="button !flex justify-between hover:border-primary hover:bg-primary hover:text-white transition-all duration-300 ease-in-out"
          href={"/menu-items"}
        >
          <span className="uppercase">See all menu items</span>
          <Left />
        </Link>
      </div>
      
    </section>
  );
}
