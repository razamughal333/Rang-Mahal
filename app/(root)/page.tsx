import ConsultationForm from "@/components/form/ConsultationForm";
import FilterForm from "@/components/form/FilterForm";
import CarouselParent from "@/components/home/CarouselParent";
import { Button } from "@/components/ui/button";
import { serviceCategories } from "@/lib/constants";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <section className=" h-screen bg-landing bg-cover bg-center bg-no-repeat pb-20">
        <FilterForm />
      </section>
      <section className="2xs:px-10 px-4 py-20 md:px-24">
        <h2 className="h2-bold mb-8 text-center">Service Categories</h2>
        <div className="flex flex-wrap  justify-center gap-20">
          {serviceCategories.map((category) => {
            return (
              <div
                key={category.title}
                className="flex w-[128px] flex-col items-center gap-2"
              >
                <Image
                  src={category.img}
                  alt={category.title}
                  width={256}
                  height={256}
                  className="size-[128px] rounded-[50%]"
                />
                <p className="w-full text-wrap text-center">{category.title}</p>
              </div>
            );
          })}
        </div>
      </section>
      <section className="flex items-center gap-8 px-8 py-20 max-md:flex-col md:max-lg:gap-4 lg:px-24 ">
        <Image
          src={"/images/contact/1.jpg"}
          alt={"bride"}
          width={530}
          height={600}
          className="h-[600px] object-cover"
        />
        <div className="flex flex-col items-center gap-4">
          <div className="text-center text-3xl font-extralight">
            <p>“Ready to Turn your dream wedding into reality ?</p>
            <p>
              {" "}
              Contact us today and let’s start planning your perfect days!”
            </p>
          </div>
          <Button
            type="submit"
            className="mx-auto rounded-3xl bg-primary-900 px-4 py-[2px] text-light-900 duration-300 hover:bg-primary-500"
          >
            Contact Us
          </Button>
        </div>
      </section>
      <CarouselParent />
      <section className="grid gap-8  px-12 py-20 lg:grid-cols-2 lg:grid-rows-2 1.5xl:grid-cols-3 1.5xl:grid-rows-3 2xl:px-24">
        <Image
          src="/images/gallery/photo.jpg"
          alt="gallery"
          width={800}
          height={800}
          className="h-[520px] w-[400px] border-[5px] border-white object-cover shadow-dark-1 1.5xl:row-start-1 1.5xl:row-end-3"
        />
        <Image
          src="/images/gallery/bride.jpg"
          alt="gallery"
          width={800}
          height={800}
          className="h-[520px] w-[400px] justify-self-center border-[5px] border-white object-cover shadow-dark-1 lg:max-1.5xl:col-start-1 lg:max-1.5xl:col-end-3 1.5xl:row-start-2 1.5xl:row-end-4"
        />
        <Image
          src="/images/gallery/hall.jpg"
          alt="gallery"
          width={800}
          height={800}
          className="h-[520px] w-[400px] justify-self-end border-[5px] border-white object-cover shadow-dark-1 lg:row-start-1 lg:max-1.5xl:col-start-2 1.5xl:row-end-3"
        />
      </section>
      <section className="px-8 py-20 md:px-24">
        <h1 className="h1-bold text-center">Reserve a Consultation</h1>
        <ConsultationForm />
      </section>
    </>
  );
}
