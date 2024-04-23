"use client";

import UserTabs from "@/components/layout/UserTabs";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useProfile } from "@/hooks/use-profile";
import { toast } from "react-hot-toast";

export default function CategoriesPage() {
  const [CategoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const { loading: profileLoading, data: profileData } = useProfile();
  const [editedCategory, setEditedCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    fetch("/api/categories").then((res) => {
      res.json().then((categories) => {
        setCategories(categories);
      });
    });
  }

  async function handleCategorySubmit(e) {
    e.preventDefault();
    const creationPromise = new Promise(async (resolve, reject) => {
      const data = { name: CategoryName };
      if (editedCategory) {
        data._id = editedCategory._id;
      }
      const response = await fetch("/api/categories", {
        method: editedCategory ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setCategoryName("");
      fetchCategories();
      setEditedCategory(null);
      if (response.ok) resolve();
      else reject();
    });

    await toast.promise(creationPromise, {
      loading: editedCategory
        ? "Updating category..."
        : "Creating your new category.",
      success: editedCategory ? "Updated category." : "Category created.",
      error: editedCategory
        ? "Failed to update category."
        : "Falied to create category.",
    });
  }

  if (profileLoading) {
    return "Loading User Info...";
  }

  if (!profileData.admin) {
    return redirect("/404");
  }

  return (
    <section className="mt-8 max-w-lg mx-auto">
      <UserTabs isAdmin={true} />
      <form className="mt-8" onSubmit={handleCategorySubmit}>
        <div className="flex gap-2 items-end">
          <div className="grow">
            <label>
              {editedCategory ? "Update category name" : "New category name"}
            </label>
            <input
              type="text"
              value={CategoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </div>
          <div className="pb-3">
            <button className="border border-primary" type="submit">
              {editedCategory ? "Update" : "Create"}
            </button>
          </div>
        </div>
      </form>
      <div>
        <h2 className="mt-8 text-sm text-gray-500">Edit category:</h2>
        {categories?.length > 0 &&
          categories.map((c, i) => (
            <button
              onClick={() => {
                setEditedCategory(c);
                setCategoryName(c.name);
              }}
              key={i}
              className="rounded-lg p-2 px-4 flex gap-1 cursor-pointer mb-1 text-black"
            >
              <span>{c.name}</span>
            </button>
          ))}
      </div>
    </section>
  );
}
