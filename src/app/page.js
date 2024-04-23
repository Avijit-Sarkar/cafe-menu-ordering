import Hero from "@/components/layout/Hero";
import HomeMenu from "@/components/layout/HomeMenu";
import SectionHeaders from "@/components/layout/SectionHeaders";

export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />
      <section className="text-center my-16">
        <SectionHeaders subHeader={"our story"} mainHeader={"About Us"} />
        <div className="max-w-md mx-auto mt-4 text-gray-500 flex flex-col gap-4">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Id ad
            cumque repellat dolor velit ducimus eveniet ex qui, temporibus quae
            distinctio, incidunt eos neque ab, earum consectetur autem rem
            aperiam.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Id ad
            cumque repellat dolor velit ducimus eveniet ex qui, temporibus quae
            distinctio, incidunt eos neque ab, earum consectetur autem rem
            aperiam.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Id ad
            cumque repellat dolor velit ducimus eveniet ex qui, temporibus quae
            distinctio, incidunt eos neque ab, earum consectetur autem rem
            aperiam.
          </p>
        </div>
      </section>
      <section className="text-center my-8">
        <SectionHeaders
          subHeader={"Looking forward"}
          mainHeader={"Contact Us"}
        />
        <div className="mt-4">
          <a
            className="text-4xl underline text-gray-500"
            href="tel:+46738123123"
          >
            +46 738 123 123
          </a>
        </div>
      </section>
    </>
  );
}
